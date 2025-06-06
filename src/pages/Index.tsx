
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Simply redirect to home page using Navigate component
  return <Navigate to="/" replace />;
};

export default Index;
