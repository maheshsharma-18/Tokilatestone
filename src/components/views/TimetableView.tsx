import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PrincipalTimetableView } from './PrincipalTimetableView';
import { ClassTeacherTimetableView } from './ClassTeacherTimetableView';
import { SubjectTeacherTimetableView } from './SubjectTeacherTimetableView';

export const TimetableView = () => {
  const { user } = useAuth();

  // Route to role-specific timetable views
  if (user?.role === 'principal' || user?.role === 'vice_principal') {
    return <PrincipalTimetableView />;
  }

  if (user?.role === 'class_teacher') {
    return <ClassTeacherTimetableView />;
  }

  if (user?.role === 'teacher' || user?.role === 'subject_teacher') {
    return <SubjectTeacherTimetableView />;
  }

  // Default fallback
  return <SubjectTeacherTimetableView />;
};
