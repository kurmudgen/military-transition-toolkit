/**
 * Military-to-Civilian Jargon Translation Dictionary
 * Auto-generated from career guides
 */

export const jargonDictionary = {
  'NCOIC': ['supervisor', 'team lead', 'manager'],
  'OIC': ['officer in charge', 'program manager', 'director'],
  'squad leader': ['team supervisor', 'group lead', 'unit manager'],
  'platoon sergeant': ['senior supervisor', 'operations manager', 'department head'],
  'conducted': ['executed', 'performed', 'completed', 'carried out'],
  'supervised': ['managed', 'oversaw', 'directed', 'led'],
  'coordinated': ['organized', 'arranged', 'facilitated', 'managed'],
  'maintained': ['serviced', 'preserved', 'managed', 'kept'],
  'trained': ['educated', 'instructed', 'developed', 'coached'],
  'operated': ['used', 'ran', 'managed', 'controlled'],
  'accountability': ['responsibility', 'oversight', 'management'],
  'mission': ['project', 'objective', 'goal', 'assignment'],
  'deployment': ['assignment', 'project', 'operation'],
  'billet': ['position', 'role', 'assignment'],
  'collateral duty': ['additional responsibility', 'secondary role'],
  'watch': ['shift', 'duty period', 'scheduled work period'],
  'quarters': ['work area', 'workspace', 'facility'],
  'head count': ['attendance', 'roster check', 'personnel count'],
  'muster': ['meeting', 'assembly', 'team gathering'],
  'liberty': ['time off', 'leave', 'personal time'],
  'field day': ['facility cleaning', 'maintenance day'],
  'PCS': ['relocation', 'transfer', 'job change'],
  'TDY': ['temporary assignment', 'business travel'],
  'TAD': ['temporary duty', 'short-term assignment'],
  'SOP': ['standard operating procedure', 'established process', 'protocol'],
  'ROE': ['rules of engagement', 'operational guidelines', 'protocols'],
  'SITREP': ['status report', 'situation update', 'progress report'],
  'AAR': ['after action review', 'post-project assessment', 'lessons learned'],
  'zero defects': ['error-free', 'perfect record', '100% compliance']
};

export function translateTerm(term) {
  const normalized = term.toLowerCase().trim();
  return jargonDictionary[normalized] || [term];
}

export function civilianizeText(text) {
  let result = text;
  Object.entries(jargonDictionary).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    result = result.replace(regex, civilian[0]);
  });
  return result;
}
