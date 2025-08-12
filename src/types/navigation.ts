export interface MenuItem {
  id: string
  label: string
  href: string
  children?: MenuItem[]
  isExternal?: boolean
  isHighlighted?: boolean
}

export interface NavigationProps {
  className?: string
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
} 