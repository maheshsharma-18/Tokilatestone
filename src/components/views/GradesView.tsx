import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PrincipalGradesView } from './PrincipalGradesView';
import { ClassTeacherGradesView } from './ClassTeacherGradesView';
import { SubjectTeacherGradesView } from './SubjectTeacherGradesView';

export const GradesView = () => {
  const { user } = useAuth();

  // Route to role-specific grade views
  if (user?.role === 'principal' || user?.role === 'vice_principal') {
    return <PrincipalGradesView />;
  }

  if (user?.role === 'class_teacher') {
    return <ClassTeacherGradesView />;
  }

  if (user?.role === 'teacher') {
    return <SubjectTeacherGradesView />;
  }

  // Default fallback
  return <SubjectTeacherGradesView />;
};
