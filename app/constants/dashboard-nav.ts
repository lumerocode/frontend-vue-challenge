import iconHome from '@/assets/img/icons/icon-nav-home.svg'
import iconHistory from '@/assets/img/icons/icon-nav-history.svg'
import iconBankAccounts from '@/assets/img/icons/icon-nav-bank-accounts.svg'
import iconGifts from '@/assets/img/icons/icon-nav-gifts.svg'
import iconBenefits from '@/assets/img/icons/icon-nav-benefits.svg'
import iconAlerts from '@/assets/img/icons/icon-nav-alerts.svg'
import iconKoins from '@/assets/img/icons/icon-nav-koins.svg'
import iconHelp from '@/assets/img/icons/icon-nav-help.svg'

export interface DashboardNavItem {
  id: string
  label: string
  icon: string
  href?: string
  badge?: string
  active?: boolean
}

/* Sidebar navigation items */
export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'home', label: 'Inicio', icon: iconHome, href: '/dashboard', active: true },
  { id: 'history', label: 'Historial de operaciones', icon: iconHistory },
  { id: 'bank-accounts', label: 'Cuentas bancarias', icon: iconBankAccounts },
  { id: 'referrals', label: 'Regala y gana', icon: iconGifts },
  { id: 'benefits', label: 'Kambista beneficios', icon: iconBenefits },
  { id: 'alerts', label: 'Alertas de tipo de cambio', icon: iconAlerts },
  { id: 'koins', label: 'Kambi Koinks', icon: iconKoins, badge: 'NUEVO' },
  { id: 'help', label: 'Ayuda', icon: iconHelp }
]