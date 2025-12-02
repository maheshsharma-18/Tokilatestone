import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PrincipalAttendanceView } from './PrincipalAttendanceView';
import { ClassTeacherAttendanceView } from './ClassTeacherAttendanceView';
import { SubjectTeacherAttendanceView } from './SubjectTeacherAttendanceView';

export const AttendanceView = () => {
  const { user } = useAuth();

  // Route to role-specific attendance views
  if (user?.role === 'principal' || user?.role === 'vice_principal') {
    return <PrincipalAttendanceView />;
  }

  if (user?.role === 'class_teacher') {
    return <ClassTeacherAttendanceView />;
  }

  if (user?.role === 'teacher') {
    return <SubjectTeacherAttendanceView />;
  }

  // Default fallback
  return <SubjectTeacherAttendanceView />;
};
