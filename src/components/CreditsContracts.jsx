import React, { useContext } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from '../lib/translations';

const CreditsContracts = () => {
  const language = 'he'; // ברירת מחדל לעברית
  const t = useTranslation();
  
  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <FileText className="w-8 h-8 text-white ml-3" />
          <h1 className="text-3xl font-bold text-white">{t('creditsAndContracts')}</h1>
        </div>
        <p className="text-gray-400 text-lg">
          {t('creditsAndContractsDescription')}
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-studio-gray border-studio-gray">
          <CardContent>
            <div className="text-center py-12">
              <div className="bg-studio-dark rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">{t('creditsManagement')}</h3>
                <div className="space-y-3 text-gray-400">
                  <p>{t('creditsModuleBuilding')}</p>
                  <p>{t('creditsManagementFeatures')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditsContracts; 