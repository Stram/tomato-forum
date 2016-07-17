import RegisterPageView from 'views/pages/register';
import LoginPageView from 'views/pages/login';
import VerifyPageView from 'views/pages/verify';
import FirstStepsPhotoPageView from 'views/pages/first-steps/photo';
import DashboardPageView from 'views/pages/dashboard';
import ForumPageView from 'views/pages/forum';
import ThreadPageView from 'views/pages/thread';
import ProfilePageView from 'views/pages/profile';
import ForumEditPageView from 'views/pages/forum/edit';

export default {
  landing: {
    View: LoginPageView,
    authenticated: false,
    wrapped: false
  },
  login: {
    View: LoginPageView,
    authenticated: false,
    wrapped: false
  },
  register: {
    View: RegisterPageView,
    authenticated: false,
    wrapped: false
  },
  verify: {
    View: VerifyPageView,
    authenticated: false,
    wrapped: false
  },
  dashboard: {
    View: DashboardPageView,
    authenticated: true,
    wrapped: true
  },
  firstStepsPhoto: {
    View: FirstStepsPhotoPageView,
    authenticated: true,
    wrapped: false
  },
  forum: {
    View: ForumPageView,
    authenticated: true,
    wrapped: true
  },
  thread: {
    View: ThreadPageView,
    authenticated: true,
    wrapped: true
  },
  profile: {
    View: ProfilePageView,
    authenticated: true,
    wrapped: true
  },
  forumEdit: {
    View: ForumEditPageView,
    authenticated: true,
    wrapped: true
  }
};
