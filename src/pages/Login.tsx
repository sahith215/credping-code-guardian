
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AtSign, User, Github, Twitter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isSignUp ? "Account created" : "Login successful",
      description: isSignUp 
        ? "Your account has been created. Welcome to CredPing!" 
        : "Welcome back to CredPing!",
    });
    
    // Redirect to dashboard after successful login/signup
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  // Toggle between sign in and sign up forms with animation
  const toggleSignUpMode = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setIsFlipping(false);
    }, 400); // Half of the flip animation duration
  };

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCardPosition({ x, y });
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    setCardPosition({ x: 0, y: 0 });
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Trigger file input click when avatar is clicked
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Go back to previous page
  const handleBackNavigation = () => {
    navigate(-1);
  };

  // Calculate card transform style based on mouse position
  const cardStyle = {
    transform: `perspective(1000px) rotateY(${cardPosition.x * 10}deg) rotateX(${-cardPosition.y * 10}deg) translateZ(20px)`,
    transition: 'transform 0.1s ease-out',
  };

  // Calculate card flip style
  const flipStyle = isFlipping ? {
    transform: 'rotateY(90deg)',
    transition: 'transform 0.8s ease-out',
  } : {
    transition: 'transform 0.8s ease-out',
  };

  return (
    <div className="min-h-screen bg-credping-black flex flex-col justify-center items-center p-4 md:p-8 page-transition">
      <div className="container max-w-4xl mx-auto">
        <Button 
          onClick={handleBackNavigation} 
          variant="ghost" 
          className="mb-6 text-gray-400 hover:text-white transition-colors back-button absolute top-6 left-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
      </div>
      
      <div 
        ref={cardRef}
        className="perspective-1000 w-full max-w-md"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          style={{ ...cardStyle, ...flipStyle }}
          className="card-raised p-8 transform-style-3d relative"
        >
          {/* Card Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp 
                ? 'Join CredPing and secure your code today' 
                : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          {/* Profile Image Upload (for Sign Up) */}
          {isSignUp && (
            <div className="flex justify-center mb-6">
              <div 
                className="relative cursor-pointer group"
                onClick={handleAvatarClick}
              >
                <Avatar className="w-24 h-24 border-2 border-credping-green/50 group-hover:border-credping-green transition-colors">
                  {profileImage ? (
                    <AvatarImage src={profileImage} />
                  ) : (
                    <AvatarFallback className="bg-credping-gray text-white">
                      <User size={32} />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white">Upload Photo</span>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username for Sign Up */}
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="username"
                    placeholder="johndoe"
                    className="pl-10 bg-credping-gray border-credping-green/20 focus:border-credping-green"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-credping-gray border-credping-green/20 focus:border-credping-green"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-credping-gray border-credping-green/20 focus:border-credping-green"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="remember" />
                <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
              </div>
              
              {!isSignUp && (
                <a href="#" className="text-sm text-credping-green hover:underline">
                  Forgot password?
                </a>
              )}
            </div>

            {/* Terms and Privacy for Sign Up */}
            {isSignUp && (
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the <a href="#" className="text-credping-green hover:underline">Terms of Service</a> and <a href="#" className="text-credping-green hover:underline">Privacy Policy</a>
                </Label>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-credping-green hover:bg-credping-green/90 text-credping-black font-medium"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            {/* Social Login */}
            <div className="relative flex items-center justify-center mt-8 mb-4">
              <div className="border-t border-white/10 absolute w-full"></div>
              <span className="bg-credping-black px-2 text-sm text-muted-foreground relative">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="bg-credping-gray border-white/10 hover:bg-credping-gray/80 text-white"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="bg-credping-gray border-white/10 hover:bg-credping-gray/80 text-white"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.11-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                  />
                </svg>
                Apple
              </Button>
            </div>

            {/* Toggle Sign Up/In */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                <button 
                  type="button"
                  onClick={toggleSignUpMode}
                  className="ml-2 text-credping-green hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>

          {/* Support Chat */}
          <div className="absolute bottom-4 right-4">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs bg-credping-gray/50 border-credping-green/30 text-credping-green hover:bg-credping-gray"
            >
              Need help?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
