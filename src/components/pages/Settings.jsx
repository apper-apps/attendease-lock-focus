import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: "Springfield Elementary",
    academicYear: "2023-2024",
    timezone: "America/New_York",
    language: "en"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    absenceThreshold: 3,
    reminderTime: "08:00"
  });

  const [saving, setSaving] = useState(false);

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("General settings saved successfully!");
    setSaving(false);
  };

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Notification settings saved successfully!");
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Configure your school management preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg mr-3">
              <ApperIcon name="Settings" className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              General Settings
            </h3>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <Input
                type="text"
                value={generalSettings.schoolName}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  schoolName: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year
              </label>
              <Input
                type="text"
                value={generalSettings.academicYear}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  academicYear: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <Select
                value={generalSettings.timezone}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  timezone: e.target.value
                })}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <Select
                value={generalSettings.language}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  language: e.target.value
                })}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </Select>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="w-full"
            >
              {saving ? (
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
              )}
              Save General Settings
            </Button>
          </form>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-accent-100 to-accent-200 rounded-lg mr-3">
              <ApperIcon name="Bell" className="h-5 w-5 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Notification Settings
            </h3>
          </div>

          <form onSubmit={handleSaveNotifications} className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send absence alerts via email</p>
              </div>
              <button
                type="button"
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  emailNotifications: !notificationSettings.emailNotifications
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.emailNotifications
                    ? "bg-primary-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Send absence alerts via SMS</p>
              </div>
              <button
                type="button"
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  smsNotifications: !notificationSettings.smsNotifications
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.smsNotifications
                    ? "bg-primary-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.smsNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Absence Threshold (days)
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={notificationSettings.absenceThreshold}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  absenceThreshold: parseInt(e.target.value)
                })}
              />
              <p className="text-sm text-gray-600 mt-1">
                Alert when student is absent for this many consecutive days
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Reminder Time
              </label>
              <Input
                type="time"
                value={notificationSettings.reminderTime}
                onChange={(e) => setNotificationSettings({
                  ...notificationSettings,
                  reminderTime: e.target.value
                })}
              />
              <p className="text-sm text-gray-600 mt-1">
                Time to send daily attendance reminders to teachers
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="w-full"
            >
              {saving ? (
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
              )}
              Save Notification Settings
            </Button>
          </form>
        </Card>
      </div>

      {/* System Information */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-gradient-to-r from-info-100 to-info-200 rounded-lg mr-3">
            <ApperIcon name="Info" className="h-5 w-5 text-info-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            System Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">v2.1.0</div>
            <div className="text-sm text-gray-600">System Version</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;