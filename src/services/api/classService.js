import classesData from "@/services/mockData/classes.json";
import usersData from "@/services/mockData/users.json";

let classes = [...classesData];
const users = [...usersData];

const classService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...classes];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return classes.find(cls => cls.Id === parseInt(id));
  },

  async create(classData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newClass = {
      Id: Math.max(...classes.map(c => c.Id)) + 1,
      ...classData,
      createdAt: new Date().toISOString()
    };
    classes.push(newClass);
    return newClass;
  },

  async update(id, classData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = classes.findIndex(cls => cls.Id === parseInt(id));
    if (index !== -1) {
      classes[index] = { ...classes[index], ...classData };
      return classes[index];
    }
    throw new Error("Class not found");
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = classes.findIndex(cls => cls.Id === parseInt(id));
    if (index !== -1) {
      const deletedClass = classes.splice(index, 1)[0];
      return deletedClass;
    }
    throw new Error("Class not found");
  },

  async getStudents(classId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const classItem = classes.find(cls => cls.Id === parseInt(classId));
    if (!classItem) {
      throw new Error("Class not found");
    }
    
    const students = users.filter(user => 
      user.role === "student" && 
      classItem.studentIds?.includes(user.Id)
    );
    
    return students;
  },

  async getTeachers(classId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const classItem = classes.find(cls => cls.Id === parseInt(classId));
    if (!classItem) {
      throw new Error("Class not found");
    }
    
    const teachers = users.filter(user => 
      user.role === "teacher" && 
      classItem.teacherIds?.includes(user.Id)
    );
    
    return teachers;
  }
};

export default classService;