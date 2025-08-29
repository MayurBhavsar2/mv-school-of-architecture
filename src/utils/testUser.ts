// Test user setup for demo purposes
export const setupTestAuditor = () => {
  const testAuditor = {
    id: 'auditor-001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'auditor',
    isAuditor: true,
    department: 'Asset Management',
    assignedBy: 'Principal User',
    assignedDate: '2024-11-20',
    permissions: ['audit_assets', 'view_reports', 'update_status']
  };
  
  localStorage.setItem('currentUser', JSON.stringify(testAuditor));
  console.log('Test auditor user set up:', testAuditor);
  return testAuditor;
};

export const setupRegularUser = () => {
  const regularUser = {
    id: 'user-001',
    name: 'Prof. John Smith',
    email: 'john.smith@university.edu',
    role: 'faculty',
    isAuditor: false,
    department: 'Computer Science'
  };
  
  localStorage.setItem('currentUser', JSON.stringify(regularUser));
  console.log('Regular user set up:', regularUser);
  return regularUser;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};