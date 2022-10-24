import "./sass/index.scss";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "components/Loading/Loading";
import UserTemplate from "templates/UserTemplate/UserTemplate";
import HomeTemplate from "templates/HomeTemplate/HomeTemplate";
import DrawerModal from "components/DrawerModal/DrawerModal";


import LoadingState from "components/LoadingState/LoadingState";

const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));

const CreateProject = lazy(() => import("pages/CreateProject"));
const ProjectManagement = lazy(() => import("pages/ProjectManagement"));
const ProjectDetail=lazy(()=>import('pages/ProjectDetail'))
const taskDetailModal=lazy(()=>import('components/TaskModal/TaskDetailModal'))
const UserManagement=lazy(()=>import('pages/UserManagement'))
const UserDetail=lazy(()=>import('pages/UserDetail'))
const PageNotFound=lazy(()=>import('components/PageNotFound/PageNotFound'))
export const history = createBrowserHistory();
function App() {
	if (!localStorage.getItem("user")) {
		return <Redirect to="/signin" />;
	}
	return (
		<Router history={history}>
			<LoadingState/>
			<Suspense fallback={<Loading />}>
				<DrawerModal />
				<Switch>
					{/* <HomeTemplate path='/dragdrop' exact Component={DragDrop} /> */}
					<UserTemplate path="/signin" exact Component={SignIn} />
					<UserTemplate path="/signup" exact Component={SignUp} />
					<HomeTemplate path="/" exact Component={ProjectManagement} />
				
					<HomeTemplate
						path="/createproject"
						exact
						Component={CreateProject}
					/>
					<HomeTemplate
						path="/projectmanagement"
						exact
						Component={ProjectManagement}
					/>

					<HomeTemplate path='/projectdetail/:id' Component={ProjectDetail} />
					<HomeTemplate path='/taskDetail' Component={taskDetailModal} />
					<HomeTemplate path='/usermanagement' Component={UserManagement} />
					<HomeTemplate path='/userdetail/:id' Component={UserDetail} />
					<Route path="*" component={PageNotFound} />
					<Redirect to="/" />
					
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
