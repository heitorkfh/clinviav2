
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  User,
  MessageSquare,
  Stethoscope,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Target,
  Send,
  Wrench,
  Cog,
  FileText
} from 'lucide-react';
import { Logo } from '../ui/logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
  { title: 'Agenda', url: '/agenda', icon: Calendar },
  { title: 'Pacientes', url: '/patients', icon: Users },
  { title: 'Profissionais', url: '/professionals', icon: Stethoscope },
  { title: 'Procedimentos', url: '/procedures', icon: FileText },
  { title: 'Atendimento', url: '/atendimento', icon: UserPlus },
  { title: 'Configurações', url: '/settings', icon: Settings },
];

const marketingSubItems = [
  { title: 'Leads', url: '/marketing/leads', icon: Target },
  { title: 'Disparos', url: '/marketing/disparos', icon: Send },
  { title: 'Ferramentas', url: '/marketing/ferramentas', icon: Wrench },
  { title: 'Configurações', url: '/marketing/configuracoes', icon: Cog },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [marketingOpen, setMarketingOpen] = useState(currentPath.startsWith('/marketing'));

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (path: string) =>
    isActive(path) 
      ? "bg-white/10 text-white shadow-lg border-l-4 border-blue-400" 
      : "text-white/80 hover:bg-white/5 hover:text-white";

  return (
    <Sidebar
      className={`${open ? "w-64" : "w-16"} bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          {open && (
            <div>
              <h1 className="text-xl font-bold text-white">
                Clinvia
              </h1>
              <p className="text-xs text-white/60">Gestão Inteligente</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="p-4 bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className={`${open ? "block" : "hidden"} text-white/60 text-xs font-semibold uppercase tracking-wider mb-4`}>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Marketing Menu with Submenu */}
              <SidebarMenuItem>
                <Collapsible open={marketingOpen} onOpenChange={setMarketingOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${currentPath.startsWith('/marketing') ? 'bg-white/10 text-white shadow-lg border-l-4 border-blue-400' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}>
                        <MessageSquare className="h-5 w-5 flex-shrink-0" />
                        {open && (
                          <>
                            <span className="font-medium flex-1">Marketing</span>
                            {marketingOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {open && (
                    <CollapsibleContent className="ml-6 mt-2 space-y-1">
                      {marketingSubItems.map((subItem) => (
                        <SidebarMenuButton key={subItem.title} asChild>
                          <NavLink 
                            to={subItem.url}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${getNavClass(subItem.url)}`}
                          >
                            <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {open && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
              Ações Rápidas
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/agenda/novo" 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-300 hover:bg-blue-500/20 font-medium transition-all duration-200"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Novo Agendamento</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/novo-paciente" 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-green-300 hover:bg-green-500/20 font-medium transition-all duration-200"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Novo Paciente</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <div className="p-4 border-t border-white/10">
        <SidebarTrigger className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20" />
      </div>
    </Sidebar>
  );
}
