import useCachedGuard from './cached'
import usePermissionGuard from './permission'
// import usePageTitleGuard from './title'
import useVisitedGuard from './visited'

export default function setupRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
  // usePageTitleGuard()
}
