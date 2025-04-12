
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { SettingsGeneral } from '@/components/settings/SettingsGeneral';
import { SettingsNotifications } from '@/components/settings/SettingsNotifications';
import { SettingsAPI } from '@/components/settings/SettingsAPI';
import { SettingsIntegration } from '@/components/settings/SettingsIntegration';
import { SettingsSecurity } from '@/components/settings/SettingsSecurity';
import { SettingsAppearance } from '@/components/settings/SettingsAppearance';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyber-secondary">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-6">
            <SettingsGeneral />
          </TabsContent>
          <TabsContent value="appearance" className="mt-6">
            <SettingsAppearance />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <SettingsNotifications />
          </TabsContent>
          <TabsContent value="integrations" className="mt-6">
            <SettingsIntegration />
          </TabsContent>
          <TabsContent value="api" className="mt-6">
            <SettingsAPI />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <SettingsSecurity />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
