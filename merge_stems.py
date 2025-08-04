#!/usr/bin/env python3
"""
Merge audio stems for KR-STUDIO audio separation
Merges piano.mp3 into other.mp3 to create the desired 5-channel output
"""

import os
import sys
from pydub import AudioSegment

def merge_piano_into_other(output_dir):
    """
    Merge piano.mp3 into other.mp3 to create the final 5-channel output
    """
    piano_path = os.path.join(output_dir, 'piano.mp3')
    other_path = os.path.join(output_dir, 'other.mp3')
    
    if not os.path.exists(piano_path):
        print(f"⚠️ Piano file not found: {piano_path}")
        return False
    
    if not os.path.exists(other_path):
        print(f"⚠️ Other file not found: {other_path}")
        return False
    
    try:
        # Load audio files
        piano_audio = AudioSegment.from_mp3(piano_path)
        other_audio = AudioSegment.from_mp3(other_path)
        
        # Merge piano into other
        merged_audio = other_audio.overlay(piano_audio)
        
        # Export merged audio
        merged_audio.export(other_path, format="mp3")
        
        # Remove piano file
        os.remove(piano_path)
        
        print(f"✅ Successfully merged piano into other: {other_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error merging stems: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python merge_stems.py <output_directory>")
        sys.exit(1)
    
    output_dir = sys.argv[1]
    if not os.path.exists(output_dir):
        print(f"❌ Output directory not found: {output_dir}")
        sys.exit(1)
    
    success = merge_piano_into_other(output_dir)
    sys.exit(0 if success else 1) 