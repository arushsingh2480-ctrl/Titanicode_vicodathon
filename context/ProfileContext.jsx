import React, { createContext, useContext, useState } from 'react'

const ProfileCtx = createContext(null)

export function ProfileProvider({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <ProfileCtx.Provider value={{ open, setOpen }}>
      {children}
    </ProfileCtx.Provider>
  )
}

export function useProfileDrawer() {
  return useContext(ProfileCtx)
}