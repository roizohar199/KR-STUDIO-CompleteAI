import React, { useState, useContext } from 'react';
import { Music, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LanguageContext } from '../App';
import { useTranslation } from '../lib/translations';

const SketchCreation = () => {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  
  const [formData, setFormData] = useState({
    project: '',
    lyrics: '',
    style: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sketch creation logic here
    console.log('Creating sketch with:', formData);
  };

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Music className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">{t('quickSketchCreation')}</h1>
        </div>
        <p className="text-gray-400 text-lg">
          {t('sketchCreationDescription')}
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{t('createNewSketch')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('selectProject')}
                </label>
                <Select value={formData.project} onValueChange={(value) => handleInputChange('project', value)}>
                  <SelectTrigger className="w-full bg-studio-dark border-studio-gray text-white">
                    <SelectValue placeholder={t('selectProjectPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-studio-gray border-studio-gray">
                    <SelectItem value="project1">{t('project1')}</SelectItem>
                    <SelectItem value="project2">{t('project2')}</SelectItem>
                    <SelectItem value="project3">{t('project3')}</SelectItem>
                    <SelectItem value="new">{t('createNewProject')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lyrics or General Idea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('lyricsOrGeneralIdea')}
                </label>
                <Textarea
                  value={formData.lyrics}
                  onChange={(e) => handleInputChange('lyrics', e.target.value)}
                  placeholder={t('lyricsPlaceholder')}
                  className="w-full bg-studio-dark border-studio-gray text-white placeholder:text-gray-500 min-h-[120px] resize-none"
                />
              </div>

              {/* Musical Style */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('musicalStyle')}
                </label>
                <Input
                  type="text"
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                  placeholder={t('musicalStylePlaceholder')}
                  className="w-full bg-studio-dark border-studio-gray text-white placeholder:text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="studio"
                size="lg"
                className="w-full h-14 text-lg font-semibold studio-gradient hover:studio-gradient-hover"
              >
                <Sparkles className="w-6 h-6 ml-3" />
                {t('createSketchWithAI')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Features (placeholder for future implementation) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-studio-gray border-studio-gray">
            <CardHeader>
              <CardTitle className="text-white">{t('recentSketches')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-400">{t('noSketchesToShow')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-studio-gray border-studio-gray">
            <CardHeader>
              <CardTitle className="text-white">{t('aiSettings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t('highQuality')}</span>
                  <div className="w-12 h-6 bg-studio-primary rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t('automaticHarmonies')}</span>
                  <div className="w-12 h-6 bg-studio-primary rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SketchCreation; 