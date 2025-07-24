// src/App.jsx
import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
//import Collabs from './pages/Collabs';
//import Profile from './pages/Profile';
import CollabsPage from './pages/CollabsPage'
import NotFoundPage from './pages/NotFoundPage';
import CreateCollabPage from './pages/CreateCollabPage';
import CollabPage from './pages/CollabPage';
import EditCollabPage from './pages/EditCollabPage';
import AddResponsePage from './pages/AddResponsePage'
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {

  const collabLoader = async ({ params }) => {
      const res = await fetch(`/api/collabs/${params.id}`);
      if (!res.ok) {
        throw new Error('Could not fetch collab');
      }
      return res.json();
  };

  const deleteCollab = async (id) => {
    await fetch(`/api/collabs/${id}`, {
      method: 'DELETE',
    });
  };

    
  const updateCollab = async (updatedCollab) => {
      await fetch(`/api/collabs/${updatedCollab.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCollab),
      });
  };
  
  
  const addCollab = async (newCollab) => {
        const res = await fetch('/api/collabs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCollab),
      });

        return;
    };
  
  const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path = "/" element ={<LandingPage />} />
    <Route path = "/login" element ={<LoginPage />} />
    <Route path = "/signup" element ={<SignupPage/>} />


    <Route path="/dashboard" element={<MainLayout />}>
      <Route index element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} /> 
      <Route path="collabs" element={<CollabsPage isGlobal={true} />} />
      <Route path="your-collabs" element={<CollabsPage isGlobal={false} />} />
      <Route path="your-responses" element={<CollabsPage isGlobal={true} isResponses={true} />} />
      <Route path="create-collab" element={<CreateCollabPage addCollabSubmit={addCollab} />} />
      <Route path="collabs/:id" element={<CollabPage deleteCollab={deleteCollab} />} loader={collabLoader} />
      <Route path="profile" element={<ProfilePage diffUser = {false} />} />
      <Route path="profiles/:id" element={<ProfilePage diffUser={true} />} />
      <Route path="collabs/:id/respond" element={<AddResponsePage />} />
      <Route path="edit-profile" element={<EditProfilePage />} />  
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="edit-collab/:id" element={<EditCollabPage updateCollabSubmit={updateCollab} />} loader={collabLoader}/>
    </Route>

      <Route path = '*' element = {<NotFoundPage />} />    

    </>
  )
);

  //final return
  return (
  <>
  <RouterProvider router={router} />
   <ToastContainer position="top-right" autoClose={3000} />
  </>);
};

export default App;
