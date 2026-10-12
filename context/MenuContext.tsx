'use client' // 👈 Importante: Los estados requieren el cliente
import { createContext, useContext, useState } from 'react'

interface MenuContextType {
    isOpen: boolean
    toggleMenu: () => void
    closeMenu: () => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen((prev) => !prev)
    const closeMenu = () => setIsOpen(false)

    return (
        <MenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

// Hook personalizado para usarlo fácilmente
export function useMenu() {
    const context = useContext(MenuContext)
    if (!context) throw new Error('useMenu debe usarse dentro de un MenuProvider')
    return context
}
