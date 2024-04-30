import React from 'react'
import { useAlert } from 'react-alert'
import { Navigate } from 'react-router-dom';

function AdminValidated({useAdmin,children}) {
  const alert = useAlert();
  if(!useAdmin){
    alert.error('you not admin');
    return<Navigate to='/login' replace/>
  }
  return children
}

export default AdminValidated
