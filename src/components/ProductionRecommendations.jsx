import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ProductionRecommendations = () => {
  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Lightbulb className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">המלצות הפקה</h1>
        </div>
        <p className="text-gray-400 text-lg">
          קבל הצעות עיבוד חכמות מה-AI
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent>
            <div className="text-center py-12">
              <div className="bg-studio-dark rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">הצעות חכמות</h3>
                <div className="space-y-3 text-gray-400">
                  <p>מודול המלצות הפקה בבנייה.</p>
                  <p>כאן תוכל לקבל הצעות למבנה השיר, הרמוניות, סאונדים ועוד.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionRecommendations; 