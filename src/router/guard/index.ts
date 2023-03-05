import useCachedGuard from './cached'
import useFlexMainHeightGuard from './flexMainHeight'
import usePermissionGuard from './permission'
import useVisitedGuard from './visited'

export default function setupRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
  useFlexMainHeightGuard()
}
