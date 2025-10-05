import { Cloud, Sun, Moon, Star as Stars } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function WelcomeScreen({ onLogin, onRegister }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Cloud className="w-20 h-20 text-white opacity-30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Cloud className="w-16 h-16 text-white opacity-20" />
        </div>
        <div className="absolute top-10 right-1/3 animate-pulse">
          <Sun className="w-24 h-24 text-yellow-300 opacity-40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float">
          <Moon className="w-16 h-16 text-gray-100 opacity-50" />
        </div>
        <div className="absolute top-1/3 right-10 animate-pulse">
          <Stars className="w-12 h-12 text-white opacity-60" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold text-white mb-4 tracking-wider drop-shadow-lg">
            CLIMEXA
          </h1>
          <p className="text-xl text-white opacity-90 mb-2">
            Tu Compañero Inteligente de Clima y Astronomía
          </p>
          <p className="text-lg text-blue-100 opacity-80">
            Planifica eventos con predicciones precisas y descubre el universo
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={onLogin}
            className="px-10 py-4 bg-white text-blue-900 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={onRegister}
            className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl border-2 border-white"
          >
            Registrarse
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
