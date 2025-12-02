import React, { createContext, useContext, useState, ReactNode } from 'react';
import { School } from '../types';
import { schools as initialSchools } from '../data/mockData';

interface SchoolContextType {
  schools: School[];
  addSchool: (school: School) => void;
  updateSchool: (id: string, school: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  getSchoolById: (id: string) => School | undefined;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider = ({ children }: { children: ReactNode }) => {
  const [schools, setSchools] = useState<School[]>(initialSchools);

  const addSchool = (school: School) => {
    setSchools(prev => [...prev, school]);
  };

  const updateSchool = (id: string, updatedSchool: Partial<School>) => {
    setSchools(prev => 
      prev.map(school => 
        school.id === id ? { ...school, ...updatedSchool } : school
      )
    );
  };

  const deleteSchool = (id: string) => {
    setSchools(prev => prev.filter(school => school.id !== id));
  };

  const getSchoolById = (id: string) => {
    return schools.find(school => school.id === id);
  };

  return (
    <SchoolContext.Provider value={{ schools, addSchool, updateSchool, deleteSchool, getSchoolById }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchools = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchools must be used within SchoolProvider');
  }
  return context;
};
