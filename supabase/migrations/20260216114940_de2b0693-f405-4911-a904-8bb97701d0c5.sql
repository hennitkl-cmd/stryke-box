
-- Create public videos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true);

-- Allow public read access
CREATE POLICY "Public video access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'videos');
