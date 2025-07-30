import { toast } from 'react-toastify';

const notificationService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "message" } },
          { field: { Name: "sentAt" } },
          { field: { Name: "read" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "recipientId" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };

      const response = await apperClient.fetchRecords('app_Notification', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching notifications:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "message" } },
          { field: { Name: "sentAt" } },
          { field: { Name: "read" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "recipientId" } }
        ]
      };

      const response = await apperClient.getRecordById('app_Notification', id, params);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching notification with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(notificationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: notificationData.Name || notificationData.message,
          type: notificationData.type,
          message: notificationData.message,
          sentAt: notificationData.sentAt || new Date().toISOString(),
          read: notificationData.read || false,
          studentName: notificationData.studentName,
          className: notificationData.className,
          timestamp: notificationData.timestamp || new Date().toISOString(),
          recipientId: parseInt(notificationData.recipientId),
          Tags: notificationData.Tags,
          Owner: notificationData.Owner
        }]
      };

      const response = await apperClient.createRecord('app_Notification', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create notifications ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating notification:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, notificationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: notificationData.Name,
          type: notificationData.type,
          message: notificationData.message,
          sentAt: notificationData.sentAt,
          read: notificationData.read,
          studentName: notificationData.studentName,
          className: notificationData.className,
          timestamp: notificationData.timestamp,
          recipientId: parseInt(notificationData.recipientId),
          Tags: notificationData.Tags,
          Owner: notificationData.Owner
        }]
      };

      const response = await apperClient.updateRecord('app_Notification', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update notifications ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating notification:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('app_Notification', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete notifications ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting notification:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async getByType(type) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "message" } },
          { field: { Name: "sentAt" } },
          { field: { Name: "read" } },
          { field: { Name: "studentName" } },
          { field: { Name: "className" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "recipientId" } }
        ],
        where: [
          {
            FieldName: "type",
            Operator: "EqualTo",
            Values: [type]
          }
        ]
      };

      const response = await apperClient.fetchRecords('app_Notification', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching notifications by type:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async markAsRead(id) {
    try {
      const notification = await this.getById(id);
      if (!notification) {
        throw new Error("Notification not found");
      }

      return await this.update(id, {
        ...notification,
        read: true
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error marking notification as read:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};

export default notificationService;