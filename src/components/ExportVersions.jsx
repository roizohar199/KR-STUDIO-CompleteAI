import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ExportVersions = () => {
  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <BarChart3 className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">יצוא גרסאות</h1>
        </div>
        <p className="text-gray-400 text-lg">
          יצא גרסאות שונות של השיר בלחיצת כפתור
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent>
            <div className="text-center py-12">
              <div className="bg-studio-dark rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">אפשרויות יצוא</h3>
                <div className="space-y-3 text-gray-400">
                  <p>מודול יצוא גרסאות בבנייה.</p>
                  <p>כאן תוכל לייצא גרסאות אינסטרומנטל, אקפלה ועוד Radio Edit.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportVersions; 