import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
// import MainLayout from 'layouts/main';
import DashboardLayout from 'layouts/dashboard';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
// components
import LoadingScreen from 'components/LoadingScreen';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { ADMIN_ADDRESS } from 'config/constants';
import Calender from 'pages/calender/Calender';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const network = useSelector((state) => state.network.chainId);
  const { account } = useWeb3React();
  return useRoutes([
    // Dashboard Routes
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/home" replace /> },
        { path: '/presale/:address', element: <DetailPage /> }, // presale
        { path: '/home', element: <HomePage /> },
        // { path: '/project', element: <ProjectDetail /> },
        { path: '/project/:address', element: <ProjectDetail /> },
        { path: '/create', element: <CreatePage /> }, //admin - create presale
        { path: '/create-lock', element: <CreateLock /> },
        { path: '/create-stake', element: <CreateStake /> }, //admin - create stake
        { path: '/deals', element: <Deals /> },
        { path: '/idodeals', element: <IdoDeals /> },
        { path: '/vote', element: <Vote /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/vcdeals', element: <VCDeals /> },
        { path: '/stakingpool', element: <StakingPool /> },
        { path: '/helpcenter', element: <HelpCenter /> },
        { path: '/farmingpool', element: <FarmingPool /> },
        { path: '/inodeals', element: <InoDeals /> },
        { path: '/phonecalendar', element: <PhoneCalendar /> },
        { path: '/blog', element: <Blog /> },
        { path: '/blog/:slug', element: <BlogDetaile /> },
        { path: '/news/:slug', element: <NewsDetaile /> },
        { path: '/lock', element: <LockListPage /> },
        { path: '/token-lock-detail/:token/:owner', element: <TokenLockDetailPage /> },
        { path: '/liquidity-lock-detail/:token/:owner', element: <LiquidityLockDetailPage /> },
        { path: '/presales', element: <Presales /> },
        { path: '/stakepad', element: <Stakepad /> },
        { path: '/staking/:address', element: <StakingCard /> },
        // { path: '/admin-presales', element: account === ADMIN_ADDRESS[network] ? <AdminPresales /> : '' }
        { path: '/admin-presales', element: <AdminPresales /> },
        { path: '/admin', element: <Admin /> },
        { path: '/calender', element: <Calendar /> },
        { path: '/blogList', element: <BlogList /> },
        { path: '/addBlog', element: <Blogs /> },
        { path: '/editBlog/:slug', element: <Blogs /> },
        { path: '/newsList', element: <NewsList /> },
        { path: '/addNews', element: <AddNews /> },
        { path: '/editNews/:slug', element: <AddNews /> },
        { path: '/helpList', element: <HelpList /> },
        { path: '/addHelp', element: <AddHelp /> },
        { path: '/editHelp/:slug', element: <AddHelp /> },
        { path: '/helpCenters/:slug', element: <HelpCenters /> },
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [{ path: '/', element: <LandingPage /> }]
    // },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Presales = Loadable(lazy(() => import('pages/Presales')));
const Stakepad = Loadable(lazy(() => import('pages/Stakepad')));
const StakingCard = Loadable(lazy(() => import('pages/StakingCard')));
const HomePage = Loadable(lazy(() => import('pages/HomePage')));
const IdoDeals = Loadable(lazy(() => import('pages/IdoDeals')));
const Deals = Loadable(lazy(() => import('pages/Deals')));
const InoDeals = Loadable(lazy(() => import('pages/InoDeals')));
const VCDeals = Loadable(lazy(() => import('pages/VCDeals')));
const HelpCenter = Loadable(lazy(() => import('pages/HelpCenter')));
const ProjectDetail = Loadable(lazy(() => import('pages/ProjectDetail')));
const PhoneCalendar = Loadable(lazy(() => import('pages/PhoneCalendar')));
const Vote = Loadable(lazy(() => import('pages/Vote')));
const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const StakingPool = Loadable(lazy(() => import('pages/StakingPool')));
const FarmingPool = Loadable(lazy(() => import('pages/FarmingPool')));
const Blog = Loadable(lazy(() => import('pages/Blog')));
const DetailPage = Loadable(lazy(() => import('pages/DetailPage')));
const CreatePage = Loadable(lazy(() => import('pages/CreatePage')));
const CreateLock = Loadable(lazy(() => import('pages/CreateLock')));
const CreateStake = Loadable(lazy(() => import('pages/CreateStake')));
const LockListPage = Loadable(lazy(() => import('pages/LockListPage')));
const TokenLockDetailPage = Loadable(lazy(() => import('pages/TokenLockDetailPage')));
const LiquidityLockDetailPage = Loadable(lazy(() => import('pages/LiquidityLockDetailPage')));
// const PageFour = Loadable(lazy(() => import('pages/PageFour')));
const AdminPresales = Loadable(lazy(() => import('pages/AdminPresales')));
const NotFound = Loadable(lazy(() => import('pages/Page404')));
const Admin = Loadable(lazy(() => import('pages/Admin')));
const Calendar = Loadable(lazy(() => import('pages/calender/Calender')));
// Main
// const LandingPage = Loadable(lazy(() => import('pages/LandingPage')));

/** Vicky Added 29-08-22 */
const BlogList = Loadable(lazy(() => import('pages/BlogList')));
const Blogs = Loadable(lazy(() => import('pages/Blogs')));
const NewsList = Loadable(lazy(() => import('pages/NewsList')));
const AddNews = Loadable(lazy(() => import('pages/NewsCreation')));
const HelpList = Loadable(lazy(() => import('pages/HelpList')));
const AddHelp = Loadable(lazy(() => import('pages/AddHelp')));
const HelpCenters = Loadable(lazy(() => import('pages/HelpCenters')));
const BlogDetaile = Loadable(lazy(() => import('pages/BlogDetaile')));
const NewsDetaile = Loadable(lazy(() => import('pages/NewsDetaile')));