import { redirect } from 'next/navigation';

export default function RootPage() {
  /**
   * This ensures that when a user hits the base URL, 
   * they are immediately sent to the Quick Task Log.
   */
  redirect('/fixed/logging');
  
  // This return is technically never reached, but required by TS
  return null;
}