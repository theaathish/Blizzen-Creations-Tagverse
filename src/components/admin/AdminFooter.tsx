import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Plus, ExternalLink, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { apiService } from '@/services/api';
import { Switch } from '@/components/ui/switch';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  isActive: boolean;
}

interface QuickLink {
  label: string;
  path: string;
  isActive: boolean;
}

interface FooterContent {
  description: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  showSocialLinks: boolean;
  showQuickLinks: boolean;
  copyright: string;
}

const AdminFooter = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    description: '',
    socialLinks: [],
    quickLinks: [],
    showSocialLinks: true,
    showQuickLinks: true,
    copyright: '© 2024 Blizzen Creations. All rights reserved.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const socialIconOptions = [
    { value: 'Facebook', label: 'Facebook', icon: Facebook },
    { value: 'Instagram', label: 'Instagram', icon: Instagram },
    { value: 'Linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'Youtube', label: 'YouTube', icon: Youtube }
  ];

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      setLoading(true);
      const data = await apiService.getFooterContent();
      setFooterContent(data);
    } catch (error) {
      console.error('Error fetching footer content:', error);
      setMessage({ type: 'error', text: 'Failed to load footer content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      await apiService.updateFooterContent(footerContent);
      setMessage({ type: 'success', text: 'Footer content updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating footer content:', error);
      setMessage({ type: 'error', text: 'Failed to update footer content' });
    } finally {
      setSaving(false);
    }
  };

  const addSocialLink = () => {
    setFooterContent({
      ...footerContent,
      socialLinks: [
        ...footerContent.socialLinks,
        { name: '', url: '', icon: 'Facebook', isActive: true }
      ]
    });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string | boolean) => {
    const updatedLinks = [...footerContent.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterContent({ ...footerContent, socialLinks: updatedLinks });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = footerContent.socialLinks.filter((_, i) => i !== index);
    setFooterContent({ ...footerContent, socialLinks: updatedLinks });
  };

  const addQuickLink = () => {
    setFooterContent({
      ...footerContent,
      quickLinks: [
        ...footerContent.quickLinks,
        { label: '', path: '', isActive: true }
      ]
    });
  };

  const updateQuickLink = (index: number, field: keyof QuickLink, value: string | boolean) => {
    const updatedLinks = [...footerContent.quickLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterContent({ ...footerContent, quickLinks: updatedLinks });
  };

  const removeQuickLink = (index: number) => {
    const updatedLinks = footerContent.quickLinks.filter((_, i) => i !== index);
    setFooterContent({ ...footerContent, quickLinks: updatedLinks });
  };

  const getSocialIcon = (iconName: string) => {
    const icon = socialIconOptions.find(opt => opt.value === iconName);
    return icon ? icon.icon : Facebook;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading footer content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Footer Content Management</h2>
        <p className="text-muted-foreground">
          Manage your website footer content, social links, and quick navigation links.
        </p>
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update footer description and copyright text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Footer Description</Label>
              <Textarea
                id="description"
                value={footerContent.description}
                onChange={(e) => setFooterContent({ ...footerContent, description: e.target.value })}
                placeholder="Brief description about your organization"
                rows={3}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input
                id="copyright"
                value={footerContent.copyright}
                onChange={(e) => setFooterContent({ ...footerContent, copyright: e.target.value })}
                placeholder="© 2024 Your Company. All rights reserved."
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Manage your social media presence</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="showSocial">Show Section</Label>
                <Switch
                  id="showSocial"
                  checked={footerContent.showSocialLinks}
                  onCheckedChange={(checked) => setFooterContent({ ...footerContent, showSocialLinks: checked })}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerContent.socialLinks.map((link, index) => {
              const IconComponent = getSocialIcon(link.icon);
              return (
                <Card key={index} className="p-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">Social Link {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={link.isActive}
                          onCheckedChange={(checked) => updateSocialLink(index, 'isActive', checked)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSocialLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Platform</Label>
                        <select
                          value={link.icon}
                          onChange={(e) => {
                            updateSocialLink(index, 'icon', e.target.value);
                            updateSocialLink(index, 'name', e.target.value);
                          }}
                          className="w-full mt-2 px-3 py-2 border rounded-md"
                        >
                          {socialIconOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>URL</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={link.url}
                            onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                          />
                          {link.url && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => window.open(link.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
            <Button onClick={addSocialLink} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Social Link
            </Button>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Manage quick navigation links</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="showQuick">Show Section</Label>
                <Switch
                  id="showQuick"
                  checked={footerContent.showQuickLinks}
                  onCheckedChange={(checked) => setFooterContent({ ...footerContent, showQuickLinks: checked })}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerContent.quickLinks.map((link, index) => (
              <Card key={index} className="p-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Quick Link {index + 1}</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={link.isActive}
                        onCheckedChange={(checked) => updateQuickLink(index, 'isActive', checked)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuickLink(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={link.label}
                        onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                        placeholder="About Us"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Path</Label>
                      <Input
                        value={link.path}
                        onChange={(e) => updateQuickLink(index, 'path', e.target.value)}
                        placeholder="/about"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Button onClick={addQuickLink} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Quick Link
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={fetchFooterContent} disabled={saving}>
            Reset
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminFooter;
