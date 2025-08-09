import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 flex items-center justify-center p-4">
      {/* Accent emoji in corner */}
      <div className="absolute top-8 right-8 text-3xl opacity-60">💌</div>
      
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-rose-200/40 p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-slate-800 mb-2">
              Bem-vinda de volta
            </h1>
            <p className="text-slate-600 text-sm">
              Entre na sua central de sonhos
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-black hover:text-slate-700 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-medium shadow-lg shadow-rose-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-rose-300/50"
            >
              Entrar
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-rose-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-slate-500">ou</span>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl border-rose-300 text-black hover:bg-rose-50 hover:border-rose-400 transition-all duration-300"
            >
              Criar nova conta
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-slate-500">
            Ao continuar, você concorda com nossos{" "}
            <Link to="/terms" className="text-black hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link to="/privacy" className="text-black hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6 text-sm text-slate-600">
          Já tem uma conta?{" "}
          <Link to="/" className="text-black hover:text-slate-700 font-medium">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;