import useCachedGuard from './cached'
import usePermissionGuard from './permission'
import useVisitedGuard from './visited'

export default function setupRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
}
