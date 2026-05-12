/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Copy, Check, Save, History, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { db, handleFirestoreError, OperationType } from "./lib/firebase";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, orderBy, serverTimestamp } from "firebase/firestore";

export default function App() {
  const { user } = useAuth();
  const [color, setColor] = useState("#e0e0e0");
  const [size, setSize] = useState(300);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(0.15);
  const [blur, setBlur] = useState(60);
  const [shape, setShape] = useState("flat"); // flat, concave, convex, pressed
  const [copied, setCopied] = useState(false);
  
  const [designs, setDesigns] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Reset to defaults function
  const resetToDefaults = () => {
    setColor("#e0e0e0");
    setSize(300);
    setRadius(50);
    setDistance(20);
    setIntensity(0.15);
    setBlur(60);
    setShape("flat");
  };

  // Reset state when user logs out
  useEffect(() => {
    if (!user) {
      resetToDefaults();
    }
  }, [user]);

  // Load designs from Firestore
  useEffect(() => {
    if (!user) {
      setDesigns([]);
      return;
    }

    const path = `users/${user.uid}/designs`;
    const q = query(collection(db, path), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const designsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDesigns(designsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user]);

  const saveDesign = async () => {
    if (!user) return;
    setIsSaving(true);
    const path = `users/${user.uid}/designs`;
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        name: `Design ${designs.length + 1}`,
        color,
        size,
        radius,
        distance,
        intensity,
        blur,
        shape,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDesign = async (designId: string) => {
    if (!user) return;
    const path = `users/${user.uid}/designs/${designId}`;
    try {
      await deleteDoc(doc(db, path));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const loadDesign = (design: any) => {
    setColor(design.color);
    setSize(design.size);
    setRadius(design.radius);
    setDistance(design.distance);
    setIntensity(design.intensity);
    setBlur(design.blur);
    setShape(design.shape);
    setShowHistory(false);
  };

  // Calculate shadows based on CSS variables
  const darkShadowColor = "var(--neu-dark)";
  const lightShadowColor = "var(--neu-light)";

  const getBoxShadow = () => {
    const d = distance;
    const b = blur;
    if (shape === "pressed") {
      return `inset ${d}px ${d}px ${b}px ${darkShadowColor}, inset -${d}px -${d}px ${b}px ${lightShadowColor}`;
    }
    return `${d}px ${d}px ${b}px ${darkShadowColor}, -${d}px -${d}px ${b}px ${lightShadowColor}`;
  };

  const getBackground = () => {
    if (shape === "concave") {
      return `linear-gradient(145deg, var(--neu-dark), var(--neu-light))`;
    }
    if (shape === "convex") {
      return `linear-gradient(145deg, var(--neu-light), var(--neu-dark))`;
    }
    return color;
  };

  const cssCode = `border-radius: ${radius}px;
background: ${shape === "flat" || shape === "pressed" ? color : (shape === "concave" ? "linear-gradient(145deg, var(--neu-dark), var(--neu-light))" : "linear-gradient(145deg, var(--neu-light), var(--neu-dark))")};
box-shadow: ${getBoxShadow()};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-12">
        
        {/* Preview Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[500px]">
          {/* Corner Indicators */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-slate-800 rounded-tl-2xl bg-yellow-400"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-800 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-800 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-slate-800 rounded-br-2xl"></div>

          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: `${radius}px`,
              background: getBackground(),
              boxShadow: getBoxShadow(),
              transition: "all 0.2s ease"
            }}
          ></div>
        </div>

        {/* Controls Section */}
        <div className="neu-card p-10 space-y-8 relative overflow-hidden">
          {/* History Overlay */}
          {showHistory && (
            <div className="absolute inset-0 z-20 bg-[var(--color-neu-bg)] p-10 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">Seu Histórico</h3>
                <button onClick={() => setShowHistory(false)} className="text-sm font-bold text-slate-500 hover:text-slate-800">Fechar</button>
              </div>
              {designs.length === 0 ? (
                <p className="text-slate-400 text-center py-12">Nenhum design salvo ainda.</p>
              ) : (
                <div className="space-y-4">
                  {designs.map((design) => (
                    <div key={design.id} className="flex items-center justify-between p-4 neu-card rounded-2xl group">
                      <div className="cursor-pointer flex-grow" onClick={() => loadDesign(design)}>
                        <p className="font-bold text-slate-700">{design.name}</p>
                        <p className="text-xs text-slate-400">{new Date(design.createdAt).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => deleteDesign(design.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowHistory(true)}
              className="flex items-center space-x-2 px-4 py-2 neu-card rounded-xl hover:scale-105 transition-all text-slate-600 font-bold text-sm"
              title="Histórico"
            >
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </button>
            <button 
              onClick={saveDesign}
              disabled={!user || isSaving}
              className={`flex items-center space-x-2 px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{user ? "Salvar na Conta" : "Login para Salvar"}</span>
            </button>
          </div>

          {/* Color Picker with Palette */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-slate-600 font-medium">Pick a color</span>
              <div className="relative group">
                <div 
                  className="w-10 h-10 border-2 border-slate-800 cursor-pointer transition-transform hover:scale-110 shadow-sm" 
                  style={{ backgroundColor: color }}
                ></div>
                
                {/* Palette on Hover */}
                <div className="absolute top-full left-0 mt-2 p-3 bg-white border-2 border-slate-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 w-48">
                  <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Paleta Sugerida</p>
                  <div className="grid grid-cols-4 gap-2">
                    {["#e0e0e0", "#f0f0f0", "#d1d9e6", "#b8c6db", "#e0e5ec", "#ffcc00", "#ff5555", "#55ff55", "#5555ff", "#ff8800", "#aa00ff", "#00ffff"].map((c) => (
                      <button 
                        key={c}
                        onClick={() => setColor(c)}
                        className="w-full aspect-square rounded-md border border-slate-200 hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-slate-600">Customizada</span>
                    </label>
                  </div>
                </div>
              </div>
              <span className="text-slate-400">or</span>
              <input 
                type="text" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="neu-input w-24 font-mono text-sm font-bold"
              />
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Size</span>
              </div>
              <input 
                type="range" min="10" max="400" value={size} 
                onChange={(e) => setSize(Number(e.target.value))}
                className="neu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Radius</span>
              </div>
              <input 
                type="range" min="0" max="150" value={radius} 
                onChange={(e) => setRadius(Number(e.target.value))}
                className="neu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Distance</span>
              </div>
              <input 
                type="range" min="0" max="50" value={distance} 
                onChange={(e) => setDistance(Number(e.target.value))}
                className="neu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Intensity</span>
              </div>
              <input 
                type="range" min="0.01" max="0.6" step="0.01" value={intensity} 
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="neu-slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>Blur</span>
              </div>
              <input 
                type="range" min="0" max="100" value={blur} 
                onChange={(e) => setBlur(Number(e.target.value))}
                className="neu-slider"
              />
            </div>
          </div>

          {/* Shape Selector */}
          <div className="space-y-4">
            <span className="text-sm font-bold text-slate-600">Shape</span>
            <div className="grid grid-cols-4 gap-0 bg-slate-800 p-1 rounded-lg overflow-hidden">
              <button 
                onClick={() => setShape("flat")}
                className={`py-3 flex justify-center transition-colors ${shape === "flat" ? "bg-slate-600" : "hover:bg-slate-700"}`}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 10 6 2 12 2C18 2 22 10 22 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button 
                onClick={() => setShape("concave")}
                className={`py-3 flex justify-center transition-colors ${shape === "concave" ? "bg-slate-600" : "hover:bg-slate-700"}`}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2C2 2 6 10 12 10C18 10 22 2 22 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button 
                onClick={() => setShape("convex")}
                className={`py-3 flex justify-center transition-colors ${shape === "convex" ? "bg-slate-600" : "hover:bg-slate-700"}`}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10L12 2L22 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={() => setShape("pressed")}
                className={`py-3 flex justify-center transition-colors ${shape === "pressed" ? "bg-slate-600" : "hover:bg-slate-700"}`}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2H22V10H2V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Code Output */}
          <div className="bg-[#001f3f] rounded-xl p-6 relative group">
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 flex items-center space-x-2 bg-[#2d4a6a] text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-[#3d5a7a] transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <pre className="text-cyan-400 text-xs font-mono leading-relaxed overflow-x-auto">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="neu-card p-12">
          <h2 className="text-3xl font-black text-[var(--neu-text)] mb-8 text-center">Como usar o Gerador</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
              <h3 className="text-xl font-bold text-[var(--neu-text)]">Personalize o Design</h3>
              <p className="text-slate-500 leading-relaxed">
                Use os controles deslizantes para ajustar o tamanho, raio, distância, intensidade e desfoque das sombras. Escolha entre formas planas, côncavas, convexas ou pressionadas.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
              <h3 className="text-xl font-bold text-[var(--neu-text)]">Escolha sua Cor</h3>
              <p className="text-slate-500 leading-relaxed">
                Passe o mouse sobre o seletor de cores para ver nossa paleta sugerida ou insira um código hexadecimal personalizado para combinar com seu projeto.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
              <h3 className="text-xl font-bold text-[var(--neu-text)]">Copie e Salve</h3>
              <p className="text-slate-500 leading-relaxed">
                Copie o código CSS gerado com um clique. Se estiver logado, você pode salvar suas criações favoritas na sua conta para acessar mais tarde no histórico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
