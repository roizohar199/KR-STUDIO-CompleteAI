import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const SessionManagement = () => {
  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Users className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">ניהול סשנים</h1>
        </div>
        <p className="text-gray-400 text-lg">
          עקוב אחר סשנים, קבצים ופידבקים
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <CardTitle className="text-white text-2xl">הסשנים שלי</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="bg-studio-dark rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">ניהול קרדיטים</h3>
                <div className="space-y-3 text-gray-400">
                  <p>מודול ניהול סשנים בבנייה.</p>
                  <p>כאן תוכל לנהל את כל הסשנים שלך, להזמין משתתפים ולשתף קבצים.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionManagement; 