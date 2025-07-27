import React, { useState } from 'react';
import { Music, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SketchCreation = () => {
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
          <h1 className="text-3xl font-bold text-white">יצירת סקיצות מהירה</h1>
        </div>
        <p className="text-gray-400 text-lg">
          הפוך רעיון לסקיצה מוזיקלית בכמה לחיצות
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <CardTitle className="text-white text-2xl">יצירת סקיצה חדשה</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  בחר פרויקט
                </label>
                <Select value={formData.project} onValueChange={(value) => handleInputChange('project', value)}>
                  <SelectTrigger className="w-full bg-studio-dark border-studio-gray text-white">
                    <SelectValue placeholder="...בחר פרויקט" />
                  </SelectTrigger>
                  <SelectContent className="bg-studio-gray border-studio-gray">
                    <SelectItem value="project1">פרויקט 1</SelectItem>
                    <SelectItem value="project2">פרויקט 2</SelectItem>
                    <SelectItem value="project3">פרויקט 3</SelectItem>
                    <SelectItem value="new">צור פרויקט חדש</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lyrics or General Idea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  מילים או רעיון כללי
                </label>
                <Textarea
                  value={formData.lyrics}
                  onChange={(e) => handleInputChange('lyrics', e.target.value)}
                  placeholder="הכנס את המילים, הרעיון הכללי, או התיאור של השיר..."
                  className="w-full bg-studio-dark border-studio-gray text-white placeholder:text-gray-500 min-h-[120px] resize-none"
                />
              </div>

              {/* Musical Style */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  סגנון מוזיקלי
                </label>
                <Input
                  type="text"
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                  placeholder="...לדוגמה: פופ קצבי, בלדת רוק, היפ הופ"
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
                צור סקיצה עם AI
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Features (placeholder for future implementation) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-studio-gray border-studio-gray">
            <CardHeader>
              <CardTitle className="text-white">סקיצות אחרונות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-400">אין סקיצות להצגה</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-studio-gray border-studio-gray">
            <CardHeader>
              <CardTitle className="text-white">הגדרות AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">איכות גבוהה</span>
                  <div className="w-12 h-6 bg-studio-primary rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">הרמוניות אוטומטיות</span>
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