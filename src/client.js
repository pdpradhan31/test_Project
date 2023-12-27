
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xhnvnaupwjvzdqqpzjzt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhobnZuYXVwd2p2emRxcXB6anp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2NjIyMjQsImV4cCI6MjAxOTIzODIyNH0.vafBH5_96-uy1GkAm2-5VI8qqIoisjmaD1b60DSM1Ak';
export const supabase = createClient(supabaseUrl, supabaseKey)