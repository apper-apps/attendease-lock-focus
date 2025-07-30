import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import RoleBadge from "@/components/molecules/RoleBadge";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userService from "@/services/api/userService";
import { toast } from "react-toastify";
import { format } from "date-fns";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student"
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userService.update(editingUser.Id, formData);
        toast.success("User updated successfully!");
      } else {
        await userService.create(formData);
        toast.success("User created successfully!");
      }
      
      setShowAddForm(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", phone: "", role: "student" });
      loadUsers();
    } catch (err) {
      toast.error("Failed to save user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setShowAddForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.delete(userId);
        toast.success("User deleted successfully!");
        loadUsers();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", role: "student" });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadUsers} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage users and their roles</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(true)}
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-48"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="student">Student</option>
          </Select>
        </div>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="primary">
                {editingUser ? "Update User" : "Create User"}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <Empty
          icon="Users"
          title="No Users Found"
          description="No users match your current search criteria."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">User</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Created</th>
                  <th className="text-center py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.Id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="py-4 px-6 text-gray-900">
                      {user.phone}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <ApperIcon name="Edit" className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.Id)}
                          className="text-error-600 hover:text-error-700 hover:bg-error-50"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;