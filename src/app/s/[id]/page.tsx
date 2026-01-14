import { redirect, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface ScenarioPageProps {
  params: Promise<{ id: string }>;
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { id } = await params;

  const { data: scenario, error } = await supabase
    .from('scenario')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !scenario) {
    notFound();
  }

  // Update views
  await supabase
    .from('scenario')
    .update({
      views: (scenario.views || 0) + 1,
      last_accessed_at: new Date().toISOString(),
    })
    .eq('id', id);

  // Build redirect URL based on tool type
  const toolPaths: Record<string, string> = {
    mortgage: 'mortgage-calculator',
    savings: 'savings-calculator',
    inflation: 'inflation',
  };

  const basePath = toolPaths[scenario.tool] || 'mortgage-calculator';
  const scenarioParam = encodeURIComponent(JSON.stringify(scenario.params));

  redirect(`/${basePath}/${scenario.country_code}?scenario=${scenarioParam}`);
}
