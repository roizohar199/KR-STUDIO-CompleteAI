import React, { useContext } from 'react';
import { 
  Sparkles, 
  Plus, 
  Music, 
  Mic, 
  BarChart3, 
  Users, 
  Lightbulb,
  TrendingUp,
  Calendar,
  User,
  Eye,
  Settings,
  Download,
  FileText,
  Edit3,
  ShieldCheck,
  Circle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LanguageContext } from '../App';
import { useTranslation } from '../lib/translations';

const Dashboard = ({ onPageChange }) => {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  
  const stats = [
    {
      title: t('activeProjects'),
      value: '2',
      change: language === 'he' ? '+12% השבוע' : '+12% this week',
      icon: Music,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: t('weeklyAnalyses'),
      value: '0',
      change: language === 'he' ? '+8% חודש זה' : '+8% this month',
      icon: Mic,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: t('sketchesCreated'),
      value: '0',
      change: language === 'he' ? '+15% השבוע' : '+15% this week',
      icon: BarChart3,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: t('activeSessions'),
      value: '0',
      change: language === 'he' ? 'רק עכשיו' : 'just now',
      icon: Users,
      color: 'bg-orange-500',
      trend: 'up'
    }
  ];

  const recentProjects = [
    {
      title: t('popSongExample'),
      singer: t('singerExample'),
      date: '27/07/2025',
      status: t('mix'),
      statusColor: 'bg-purple-500',
      genre: t('pop')
    },
    {
      title: t('emotionalBallad'),
      singer: t('singerFemaleExample'),
      date: '27/07/2025',
      status: t('recording'),
      statusColor: 'bg-orange-500',
      genre: t('folk')
    }
  ];

  const quickActions = [
    {
      title: t('createNewSketch'),
      subtitle: t('quickActionCreateSketchSubtitle'),
      icon: Music,
      color: 'bg-green-500',
      onClick: () => handlePageChange('sketches')
    },
    {
      title: t('newSession'),
      subtitle: t('quickActionNewSessionSubtitle'),
      icon: Users,
      color: 'bg-purple-500',
      onClick: () => handlePageChange('sessions')
    },
    {
      title: t('productionRecommendations'),
      subtitle: t('quickActionProductionRecommendationsSubtitle'),
      icon: Lightbulb,
      color: 'bg-orange-500',
      onClick: () => handlePageChange('productionRecommendations')
    }
  ];

  const handlePageChange = (page) => {
    console.log(`🖱️ [Dashboard] לחיצה על כרטיס: ${page}`);
    console.log(`🖱️ [Dashboard] עובר לדף: ${page}`);
    
    try {
      onPageChange(page);
      console.log(`✅ [Dashboard] ניווט הצליח: Dashboard → ${page}`);
    } catch (error) {
      console.error(`❌ [Dashboard] שגיאה בניווט:`, error);
      console.error(`❌ [Dashboard] פרטי השגיאה:`, {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
  };

  const getCardIcon = (page) => {
    console.log(`🎨 [Dashboard] מחפש אייקון עבור: ${page}`);
    
    switch (page) {
      case 'audio-separation':
        console.log(`🎨 [Dashboard] אייקון AudioSeparation: Mic`);
        return <Mic className="w-8 h-8" />;
      case 'productionRecommendations':
        console.log(`🎨 [Dashboard] אייקון ProductionRecommendations: Settings`);
        return <Settings className="w-8 h-8" />;
      case 'export':
        console.log(`🎨 [Dashboard] אייקון Export: Download`);
        return <Download className="w-8 h-8" />;
      case 'credits':
        console.log(`🎨 [Dashboard] אייקון Credits: FileText`);
        return <FileText className="w-8 h-8" />;
      case 'sessions':
        console.log(`🎨 [Dashboard] אייקון Sessions: Users`);
        return <Users className="w-8 h-8" />;
      case 'sketches':
        console.log(`🎨 [Dashboard] אייקון Sketches: Edit3`);
        return <Edit3 className="w-8 h-8" />;
      case 'verification':
        console.log(`🎨 [Dashboard] אייקון Verification: ShieldCheck`);
        return <ShieldCheck className="w-8 h-8" />;
      default:
        console.log(`🎨 [Dashboard] אייקון ברירת מחדל עבור: ${page}`);
        return <Circle className="w-8 h-8" />;
    }
  };

  const getCardTitle = (page) => {
    console.log(`📝 [Dashboard] מחפש כותרת עבור: ${page}`);
    
    switch (page) {
      case 'audio-separation':
        console.log(`📝 [Dashboard] כותרת AudioSeparation: הפרדת אודיו`);
        return 'הפרדת אודיו';
      case 'productionRecommendations':
        console.log(`📝 [Dashboard] כותרת ProductionRecommendations: המלצות הפקה`);
        return 'המלצות הפקה';
      case 'export':
        console.log(`📝 [Dashboard] כותרת Export: ייצוא גרסאות`);
        return 'ייצוא גרסאות';
      case 'credits':
        console.log(`📝 [Dashboard] כותרת Credits: קרדיטים וחוזים`);
        return 'קרדיטים וחוזים';
      case 'sessions':
        console.log(`📝 [Dashboard] כותרת Sessions: ניהול סשנים`);
        return 'ניהול סשנים';
      case 'sketches':
        console.log(`📝 [Dashboard] כותרת Sketches: יצירת סקיצות`);
        return 'יצירת סקיצות';
      case 'verification':
        console.log(`📝 [Dashboard] כותרת Verification: אימות משתמש`);
        return 'אימות משתמש';
      default:
        console.log(`📝 [Dashboard] כותרת ברירת מחדל עבור: ${page}`);
        return 'עמוד לא ידוע';
    }
  };

  const getCardDescription = (page) => {
    console.log(`📄 [Dashboard] מחפש תיאור עבור: ${page}`);
    
    switch (page) {
      case 'audio-separation':
        console.log(`📄 [Dashboard] תיאור AudioSeparation: הפרדת קבצי אודיו לכלי נגינה נפרדים`);
        return 'הפרדת קבצי אודיו לכלי נגינה נפרדים באמצעות AI מתקדם';
      case 'productionRecommendations':
        console.log(`📄 [Dashboard] תיאור ProductionRecommendations: קבלת המלצות הפקה מותאמות אישית`);
        return 'קבלת המלצות הפקה מותאמות אישית למוזיקה שלך';
      case 'export':
        console.log(`📄 [Dashboard] תיאור Export: ייצוא המוזיקה שלך במגוון פורמטים`);
        return 'ייצוא המוזיקה שלך במגוון פורמטים ואיכויות';
      case 'credits':
        console.log(`📄 [Dashboard] תיאור Credits: ניהול קרדיטים וחוזים`);
        return 'ניהול קרדיטים וחוזים לפרויקטים שלך';
      case 'sessions':
        console.log(`📄 [Dashboard] תיאור Sessions: ניהול סשני הקלטה ועריכה`);
        return 'ניהול סשני הקלטה ועריכה';
      case 'sketches':
        console.log(`📄 [Dashboard] תיאור Sketches: יצירת סקיצות מוזיקליות`);
        return 'יצירת סקיצות מוזיקליות ורעיונות';
      case 'verification':
        console.log(`📄 [Dashboard] תיאור Verification: אימות זהות המשתמש`);
        return 'אימות זהות המשתמש והרשאות';
      default:
        console.log(`📄 [Dashboard] תיאור ברירת מחדל עבור: ${page}`);
        return 'תיאור לא זמין';
    }
  };

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('mainDashboard')}</h1>
          <p className="text-gray-400">{t('welcomeMessage')}</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              console.log('🆕 כפתור New Project נלחץ');
              handlePageChange('sketches');
            }}
          >
            <Plus className="w-5 h-5 ml-2" />
            {t('newProject')}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-studio-gray border-studio-gray">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <div className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 ml-1" />
                      {stat.change}
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Music className="w-5 h-5 text-white ml-2" />
              <CardTitle className="text-white">{t('recentProjects')}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Eye className="w-4 h-4 ml-1" />
              {t('showAll')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-studio-dark rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${project.statusColor}`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-400 mr-2">#{project.genre}</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">{project.title}</h4>
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="w-4 h-4 ml-1" />
                      {project.singer}
                      <Calendar className="w-4 h-4 mr-4 ml-1" />
                      {project.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 text-white ml-2" />
              <CardTitle className="text-white">{t('quickActions')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="p-4 bg-studio-dark rounded-lg hover:bg-gray-800 transition-colors text-right"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-400">{action.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Menu Cards */}
      <Card className="bg-studio-gray border-studio-gray mt-6">
        <CardHeader>
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-white ml-2" />
            <CardTitle className="text-white">תפריט ראשי</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className="bg-studio-dark rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {getCardIcon(item.id)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {getCardTitle(item.id)}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {getCardDescription(item.id)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-studio-gray border-studio-gray mt-6">
        <CardHeader>
          <div className="flex items-center">
            <Lightbulb className="w-5 h-5 text-white ml-2" />
            <CardTitle className="text-white">{t('lastActivity')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400">{t('noActivity')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 