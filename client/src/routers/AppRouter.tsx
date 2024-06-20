import { Box, PaletteMode } from '@mui/material/'
import { lazy, ReactNode, Suspense } from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'

import { HomePage } from '../pages'
import { Footer } from '../components'
import PrivateRoute from './PrivateRoute'
import Toolbar from '@mui/material/Toolbar'
import AppFallback from '../components/AppFallback'
import { ResponsiveDrawer } from '../components/Navigation'

const SignIn = lazy(() => import('../components/SignIn'))
const SignUp = lazy(() => import('../components/SignUp'))
const TeamPage = lazy(() => import('../pages/team/TeamPage'))
const AboutPage = lazy(() => import('../pages/about/AboutPage'))
const UpdatePage = lazy(() => import('../pages/update/UpdatePage'))
const ContactPage = lazy(() => import('../pages/contact/ContactPage'))
const NotFoundPage = lazy(() => import('../pages/404/NotFoundPage'))
const AddonPage = lazy(() => import('../pages/addon/AddonPage'))
const AddonPrivacyPage = lazy(() => import('../pages/addon/AddonPrivacy'))
const XtremePage = lazy(() => import('../pages/xtreme/XtremePage'))
const TrainingPage = lazy(() => import('../pages/training/TrainingPage'))

interface SuspenseProps {
  children: ReactNode
}
const SuspenseWrapper = ({ children }: SuspenseProps) => (
  <Suspense fallback={<AppFallback />}>{children}</Suspense>
)

export const AppRouter = ({
  setSelectedTheme
}: {
  setSelectedTheme: (theme: PaletteMode) => void
}) => (
  <BrowserRouter>
    <ResponsiveDrawer setSelectedTheme={setSelectedTheme}>
      <Toolbar />
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/about"
            element={
              <SuspenseWrapper>
                <AboutPage />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <SuspenseWrapper>
                <ContactPage />
              </SuspenseWrapper>
            }
          />
          <Route
            path="/404"
            element={
              <SuspenseWrapper>
                <NotFoundPage />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/addon"
            element={
              <SuspenseWrapper>
                <AddonPage />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/addon/privacy"
            element={
              <SuspenseWrapper>
                <AddonPrivacyPage />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <SuspenseWrapper>
                <SignIn />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/signup"
            element={
              <SuspenseWrapper>
                <SignUp />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/xtreme"
            element={
              <SuspenseWrapper>
                <XtremePage />
              </SuspenseWrapper>
            }
          />

          <Route path="/squad" element={<PrivateRoute />}>
            <Route
              path="/squad"
              element={
                <SuspenseWrapper>
                  <TeamPage />
                </SuspenseWrapper>
              }
            />
          </Route>

          <Route path="/training" element={<PrivateRoute />}>
            <Route
              path="/training"
              element={
                <SuspenseWrapper>
                  <TrainingPage />
                </SuspenseWrapper>
              }
            />
          </Route>

          <Route path="/update" element={<PrivateRoute />}>
            <Route
              path="/update"
              element={
                <SuspenseWrapper>
                  <UpdatePage />
                </SuspenseWrapper>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Box>
      <Footer />
    </ResponsiveDrawer>
  </BrowserRouter>
)
