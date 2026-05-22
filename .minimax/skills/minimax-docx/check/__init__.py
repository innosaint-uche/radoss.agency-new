"""Document validation framework for OOXML compliance checking."""

import sys
from pathlib import Path

# Ensure the local directory is in sys.path for robust resolution within hidden folders
_current_dir = str(Path(__file__).parent)
if _current_dir not in sys.path:
    sys.path.insert(0, _current_dir)

import report
import detectors
import pipeline

from report import Gravity, Issue, ValidationReport
from detectors import (
    ScanContext,
    GridConsistencyDetector,
    AspectRatioDetector,
    AnnotationLinkDetector,
    BookmarkIntegrityDetector,
    DrawingIdUniquenessDetector,
    HyperlinkValidityDetector,
    TocImplementationDetector,
)
from pipeline import ValidationPipeline, validate_document

__all__ = [
    "Gravity",
    "Issue",
    "ValidationReport",
    "ScanContext",
    "GridConsistencyDetector",
    "AspectRatioDetector",
    "AnnotationLinkDetector",
    "BookmarkIntegrityDetector",
    "DrawingIdUniquenessDetector",
    "HyperlinkValidityDetector",
    "TocImplementationDetector",
    "ValidationPipeline",
    "validate_document",
]
