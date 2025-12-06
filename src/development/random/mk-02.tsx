////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Directory } from "expo-file-system"
import * as SecureStore from "expo-secure-store"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { Alert } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const APP_ROOT_DIRECTORY_URI = "lynx_vault_uri"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getRootDirectoryUri(): Promise<string | null> {
  const storedUri: string | null = await SecureStore.getItemAsync(APP_ROOT_DIRECTORY_URI)
  if (storedUri === null) {
    console.warn("Root Directory URI is Absent or Invalidated")
    return null
  }
  console.log("Root Directory URI is Present: [" + storedUri + "]")
  console.log("Checking if the root directory exists via the root directory URI.")
  const directory = new Directory(storedUri)
  if (!directory.exists) {
    console.warn("Root Directory is Absent or Unaccesible")
    console.log("Deleting Root Directory URI")
    await SecureStore.deleteItemAsync(APP_ROOT_DIRECTORY_URI)
    return null
  }
  console.log("Root Directory is Present and Accessible")
  return storedUri
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function selectRootDirectoryUri(): Promise<string | null> {
  try {
    console.log("Selecting Root Directory")
    const directory = await Directory.pickDirectoryAsync()
    const uri = directory.uri
    console.log("Selected Root Directory URI: [", uri, "]")
    const processedUri = uri.endsWith("/") ? uri : uri + "/"
    await SecureStore.setItemAsync(APP_ROOT_DIRECTORY_URI, processedUri)
    return processedUri
  }
  catch (object: unknown) {
    console.warn("Cancelled Root Directory Selection")
    return null
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkWriteAccess(directory: Directory): boolean {
  console.log("Testing Write Access for the Following Directory")
  console.log("Name = [" + directory.name + "]")
  console.log("URI = [" + directory.uri + "]")
  if (!directory.exists) {
    console.warn("The current directory is absent.")
    return false
  }
  try {
    const testDirectory = directory.createDirectory("test")
    testDirectory.delete()
    console.log("Result: Writing is Allowed")
    return true
  }
  catch (object: unknown) {
    const error = object as Error
    console.log("Result: Writing is Forbidden")
    console.error(error)
    return false
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function initializeRootDirectory(): Promise<boolean> {
  let validRootDirectoryUri: string | null = await getRootDirectoryUri()
  if (validRootDirectoryUri !== null) { return true }
  while (true) {
    validRootDirectoryUri = await selectRootDirectoryUri()
    if (validRootDirectoryUri !== null) { return true }
    const retry = await new Promise<boolean>((resolve) => {
      Alert.alert(
        "Root Directory is Required",
        "You must select a root directory in order to proceed.",
        [
          { text: "Exit", style: "cancel", onPress: () => resolve(false) },
          { text: "Choose Folder", onPress: () => resolve(true) }
        ],
        { cancelable: false }
      )
    })
    if (!retry) {
      console.log("Root Directory Selection Cancelled")
      return false
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RootDirectoryHook = {
  uri: string | null
  isLoading: boolean
  error: string | null
}

export const RootDirectoryContext = React.createContext<RootDirectoryHook | undefined>(undefined)

export function RootDirectoryProvider({ children }: { children: React.ReactNode })
{
  const [uri, setUri] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = (uri: string) => {
    setUri(uri)
    setIsLoading(false)
  }

  const handleError = (message: string) => {
    setError(message)
    setIsLoading(false)
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedUri = await getRootDirectoryUri()
        if (storedUri !== null) {
          handleSuccess(storedUri)
          return
        }
        const selectedUri = await selectRootDirectoryUri()
        if (selectedUri !== null) {
          handleSuccess(selectedUri)
          return
        }
        handleError("Root Directory is Required")
      }
      catch (object: unknown) {
        const error = object as Error
        handleError(error.message)
      }
    }
    initialize()
  }, [])

  const hook = useMemo<RootDirectoryHook>(() => {
    return { uri, isLoading, error }
  }, [uri, isLoading, error])

  return (
    <RootDirectoryContext.Provider value={hook}>
      {children}
    </RootDirectoryContext.Provider>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function useRootDirectory() {
  const context = useContext(RootDirectoryContext)
  if (context === undefined) { throw new Error("Root Directory Context Must Be Used Within a Root Directory Provider")}
  return context
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
