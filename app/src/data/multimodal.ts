import type { MultimodalSubModule } from '@/types';

export const multimodalSubModules: MultimodalSubModule[] = [
  {
    id: '4.6',
    title: 'Multimodal Foundations',
    category: 'vision',
    videoResources: [
      {
        id: 'clip-basics',
        title: 'How CLIP Works',
        youtubeId: 'KcFVKKsTNIU',
        duration: '6m',
        channel: 'AI Explained',
        type: 'tutorial'
      },
      {
        id: 'llava-explained',
        title: 'LLaVA Visual Instruction Tuning',
        youtubeId: 'H4YKPJ3_1fY',
        duration: '13m',
        channel: 'AI Explained',
        type: 'paper-explanation'
      },
      {
        id: 'whisper-tutorial',
        title: 'Whisper ASR Full Tutorial',
        youtubeId: 'AwJf8aQfChE',
        duration: '30m',
        channel: 'AssemblyAI',
        type: 'tutorial'
      },
      {
        id: 'vision-transformers',
        title: 'Vision Transformers Visually',
        youtubeId: 'HZ4j_U3FCp0',
        duration: '10m',
        channel: 'Computerphile',
        type: 'tutorial'
      },
      {
        id: 'audio-course',
        title: 'Audio Processing HuggingFace',
        youtubeId: '',
        duration: 'Self-paced',
        channel: 'HuggingFace',
        type: 'course',
        url: 'https://huggingface.co/learn/audio-course'
      }
    ],
    implementationTasks: [
      {
        id: 'clip-retrieval',
        title: 'CLIP Image-to-Text Retrieval',
        description: 'Build a semantic image search system using CLIP embeddings. Index 100+ images and enable text-based retrieval.',
        codeTemplate: `import torch
import clip
from PIL import Image
import numpy as np

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Build image index
image_features = []
image_paths = []

for img_path in image_dataset:
    image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        features = model.encode_image(image)
    image_features.append(features.cpu().numpy())
    image_paths.append(img_path)

# Search by text
def search_images(query, top_k=5):
    text = clip.tokenize([query]).to(device)
    with torch.no_grad():
        text_features = model.encode_text(text)
    
    similarities = cosine_similarity(text_features.cpu(), image_features)
    top_indices = np.argsort(similarities[0])[-top_k:][::-1]
    return [image_paths[i] for i in top_indices]`,
        validationSteps: [
          'Index 100+ images in <30 seconds',
          'Text query returns relevant images (manual inspection)',
          'Top-5 accuracy >70% on test queries'
        ],
        estimatedHours: 4,
        category: 'vision'
      },
      {
        id: 'whisper-pipeline',
        title: 'Whisper Pipeline with VAD',
        description: 'Process 10+ hours of audio with Whisper ASR integrated with Voice Activity Detection for segmentation.',
        codeTemplate: `import whisper
import torch
from pydub import AudioSegment
import numpy as np

# Load Whisper model
model = whisper.load_model("base")

# VAD integration with Silero
vad_model, utils = torch.hub.load(
    repo_or_dir='snakers4/silero-vad',
    model='silero_vad'
)

def transcribe_with_vad(audio_path):
    """Transcribe audio with VAD segmentation"""
    wav = read_audio(audio_path)
    speech_timestamps = get_speech_timestamps(
        wav, vad_model, 
        sampling_rate=16000
    )
    
    transcriptions = []
    for ts in speech_timestamps:
        segment = wav[ts['start']:ts['end']]
        result = model.transcribe(segment.numpy())
        transcriptions.append({
            'start': ts['start'] / 16000,
            'end': ts['end'] / 16000,
            'text': result['text']
        })
    
    return transcriptions`,
        validationSteps: [
          'Process 10 hours of audio in <30 minutes',
          'VAD correctly segments speech (no truncation)',
          'WER <15% on clean audio'
        ],
        estimatedHours: 6,
        category: 'audio'
      },
      {
        id: 'cross-modal-alignment',
        title: 'Cross-Modal Alignment',
        description: 'Create a shared embedding space where audio and image representations align using CLIP + Whisper.',
        codeTemplate: `import torch
import torch.nn as nn

class CrossModalEncoder(nn.Module):
    """Align audio and image in shared space"""
    def __init__(self, clip_dim=512, whisper_dim=512, shared_dim=256):
        super().__init__()
        self.image_proj = nn.Linear(clip_dim, shared_dim)
        self.audio_proj = nn.Linear(whisper_dim, shared_dim)
        self.temperature = nn.Parameter(torch.ones([]) * 0.07)
    
    def forward(self, image_emb, audio_emb):
        # Project to shared space
        img_shared = F.normalize(self.image_proj(image_emb), dim=-1)
        aud_shared = F.normalize(self.audio_proj(audio_emb), dim=-1)
        
        # Contrastive loss
        logits = torch.matmul(img_shared, aud_shared.T) / self.temperature
        return logits

# Training loop for alignment
for batch in dataloader:
    images, audio = batch
    
    img_emb = clip_model.encode_image(images)
    aud_emb = whisper_model.encode_audio(audio)
    
    logits = cross_modal_encoder(img_emb, aud_emb)
    loss = contrastive_loss(logits)`,
        validationSteps: [
          'Audio-image retrieval accuracy >60%',
          'Embedding space visualization shows clustering',
          'Cross-modal similarity scores are meaningful'
        ],
        estimatedHours: 8,
        category: 'integration'
      }
    ]
  },
  {
    id: '4.7',
    title: 'Speech & Voice Systems',
    category: 'voice',
    videoResources: [
      {
        id: 'whisper-finetune',
        title: 'Fine-tuning Whisper',
        youtubeId: 'MIjKx2J6518',
        duration: '20m',
        channel: 'AssemblyAI',
        type: 'tutorial'
      },
      {
        id: 'coqui-tts',
        title: 'Coqui TTS Tutorial',
        youtubeId: '3qH3_g5V2rI',
        duration: '15m',
        channel: 'AI Code King',
        type: 'implementation'
      },
      {
        id: 'voice-agent',
        title: 'Building Voice Agents',
        youtubeId: '9G8Jm4jlR80',
        duration: '25m',
        channel: 'LangChain',
        type: 'tutorial'
      },
      {
        id: 'silero-vad',
        title: 'Silero VAD Implementation',
        youtubeId: '8c8f36z3z8k',
        duration: '12m',
        channel: 'PyTorch',
        type: 'implementation'
      }
    ],
    implementationTasks: [
      {
        id: 'streaming-asr',
        title: 'Real-time Streaming ASR',
        description: 'Build WebSocket-based streaming ASR with <800ms latency using Whisper and WebRTC.',
        codeTemplate: `from fastapi import FastAPI, WebSocket
import whisper
import torch
import numpy as np

app = FastAPI()
model = whisper.load_model("base")

class StreamingASR:
    def __init__(self):
        self.buffer = []
        self.buffer_duration = 0
        
    async def process_chunk(self, audio_chunk):
        """Process audio chunk with VAD"""
        self.buffer.append(audio_chunk)
        self.buffer_duration += len(audio_chunk) / 16000
        
        # Process when buffer reaches 2 seconds
        if self.buffer_duration >= 2.0:
            audio = np.concatenate(self.buffer)
            result = model.transcribe(audio, language='en')
            self.buffer = []
            self.buffer_duration = 0
            return result['text']
        return None

@app.websocket("/asr")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    asr = StreamingASR()
    
    while True:
        audio_bytes = await websocket.receive_bytes()
        audio = np.frombuffer(audio_bytes, dtype=np.float32)
        
        text = await asr.process_chunk(audio)
        if text:
            await websocket.send_json({
                'text': text,
                'is_final': True
            })`,
        validationSteps: [
          'End-to-end latency <800ms',
          'WebSocket handles 10 concurrent streams',
          'WER <10% on streaming audio'
        ],
        estimatedHours: 8,
        category: 'audio'
      },
      {
        id: 'voice-cloning',
        title: 'Voice Cloning with XTTS v2',
        description: 'Implement voice cloning using Coqui XTTS v2 with just 1-minute voice samples.',
        codeTemplate: `from TTS.api import TTS
import torch

# Load XTTS v2 model
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")

def clone_voice(text, speaker_wav, language='en'):
    """Clone voice from sample audio"""
    output_path = "output.wav"
    
    tts.tts_to_file(
        text=text,
        speaker_wav=speaker_wav,  # 1-minute sample
        language=language,
        file_path=output_path
    )
    
    return output_path

# Multi-speaker support
speakers = {
    'speaker1': 'samples/speaker1_60s.wav',
    'speaker2': 'samples/speaker2_60s.wav'
}

# Generate with different voices
for speaker, sample_path in speakers.items():
    clone_voice(
        "Hello, this is my cloned voice!",
        sample_path
    )`,
        validationSteps: [
          'Voice similarity >80% (subjective evaluation)',
          'Generation time <5s for 10s audio',
          'Support 3+ languages'
        ],
        estimatedHours: 4,
        category: 'voice'
      },
      {
        id: 'multilingual-agent',
        title: 'Multilingual Voice Agent',
        description: 'Build a voice agent that auto-detects language and responds in the same language.',
        codeTemplate: `class MultilingualVoiceAgent:
    def __init__(self):
        self.asr = whisper.load_model("large-v3")
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
        self.language_map = {
            'en': 'en',
            'es': 'es',
            'fr': 'fr',
            'de': 'de',
            'zh': 'zh-cn'
        }
    
    async def process_audio(self, audio_bytes):
        # Transcribe with language detection
        result = self.asr.transcribe(audio_bytes)
        text = result['text']
        detected_lang = result.get('language', 'en')
        
        # Process with LLM
        response = await self.llm.chat(text)
        
        # Synthesize in same language
        tts_lang = self.language_map.get(detected_lang, 'en')
        audio_response = self.tts.tts(
            text=response,
            language=tts_lang
        )
        
        return {
            'input_text': text,
            'detected_language': detected_lang,
            'response_text': response,
            'audio': audio_response
        }

# FastAPI endpoint
@app.post("/voice-chat")
async def voice_chat(audio: UploadFile):
    audio_bytes = await audio.read()
    result = await agent.process_audio(audio_bytes)
    return result`,
        validationSteps: [
          'Auto-detects 5+ languages',
          'Response in same language as input',
          'End-to-end latency <2s'
        ],
        estimatedHours: 6,
        category: 'voice'
      }
    ]
  },
  {
    id: '4.8',
    title: 'Multimodal Agents',
    category: 'agent',
    videoResources: [
      {
        id: 'gpt4v-agent',
        title: 'Building GPT-4V Vision Agents',
        youtubeId: 'LVhFyF5zt1g',
        duration: '22m',
        channel: 'LangChain',
        type: 'tutorial'
      },
      {
        id: 'langgraph-multi',
        title: 'Multimodal LangGraph',
        youtubeId: 'pb5rSw4J2p4',
        duration: '18m',
        channel: 'LangChain',
        type: 'implementation'
      },
      {
        id: 'video-rag',
        title: 'Video Understanding RAG',
        youtubeId: 'JpU7kzN4X9w',
        duration: '35m',
        channel: 'AI Engineering',
        type: 'paper-explanation'
      }
    ],
    implementationTasks: [
      {
        id: 'vision-react',
        title: 'Vision-Enabled ReAct Agent',
        description: 'Build a ReAct agent that can see images and take actions based on visual understanding.',
        codeTemplate: `from langchain.agents import Tool, AgentExecutor
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
import base64

class VisionReActAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4-vision-preview")
        self.tools = [
            Tool(name="see", func=self.see_image, 
                 description="Analyze an image"),
            Tool(name="search", func=self.web_search,
                 description="Search the web")
        ]
    
    def see_image(self, image_path):
        """Encode and analyze image"""
        with open(image_path, "rb") as f:
            image_base64 = base64.b64encode(f.read()).decode()
        
        message = HumanMessage(
            content=[
                {"type": "text", "text": "Describe this image in detail"},
                {"type": "image_url", 
                 "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}}
            ]
        )
        
        response = self.llm.invoke([message])
        return response.content
    
    def run(self, query, image_path=None):
        """Run agent with optional image"""
        if image_path:
            observation = self.see_image(image_path)
            query = f"{query}\\n\\nImage observation: {observation}"
        
        # ReAct loop
        for step in range(10):
            action = self.llm.predict(
                f"Question: {query}\\nThought: "
            )
            # ... execute action
        
        return final_answer`,
        validationSteps: [
          'Agent correctly describes images',
          'Uses visual info to answer questions',
          'Handles 5+ different image types'
        ],
        estimatedHours: 6,
        category: 'vision'
      },
      {
        id: 'video-understanding',
        title: 'Video Understanding with RAG',
        description: 'Build a system that indexes video content and enables question-answering over videos.',
        codeTemplate: `from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings
import cv2
import whisper

class VideoRAG:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Qdrant(
            client=qdrant_client,
            collection_name="video_frames",
            embeddings=self.embeddings
        )
        self.whisper = whisper.load_model("base")
    
    def index_video(self, video_path):
        """Extract frames and audio, index in vector store"""
        # Extract frames every 2 seconds
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_interval = int(fps * 2)
        
        frames = []
        frame_count = 0
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_count % frame_interval == 0:
                # Save frame and extract description
                timestamp = frame_count / fps
                frames.append({
                    'frame': frame,
                    'timestamp': timestamp
                })
            
            frame_count += 1
        
        # Transcribe audio
        audio_result = self.whisper.transcribe(video_path)
        
        # Index frames with descriptions
        for frame_data in frames:
            description = self.describe_frame(frame_data['frame'])
            self.vectorstore.add_texts(
                [description],
                metadatas=[{
                    'timestamp': frame_data['timestamp'],
                    'type': 'frame'
                }]
            )
    
    def query(self, question):
        """Answer question about video content"""
        results = self.vectorstore.similarity_search(question, k=5)
        
        context = "\\n".join([r.page_content for r in results])
        answer = self.llm.predict(
            f"Based on this video context:\\n{context}\\n\\nQuestion: {question}"
        )
        
        return answer`,
        validationSteps: [
          'Indexes 30-min video in <5 minutes',
          'Answers questions about video content',
          'Provides timestamps for answers'
        ],
        estimatedHours: 8,
        category: 'vision'
      },
      {
        id: 'omni-modal-graph',
        title: 'Omni-Modal LangGraph',
        description: 'Build a LangGraph agent that manages state across text, image, and audio modalities.',
        codeTemplate: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Sequence
import operator

class OmniModalState(TypedDict):
    """State with multimodal context"""
    messages: Annotated[Sequence, operator.add]
    images: list  # Base64 encoded images
    audio_segments: list  # Audio metadata
    current_modality: str  # 'text', 'image', 'audio'
    pending_tool_calls: list

# Define nodes
def process_input(state: OmniModalState):
    """Route based on input modality"""
    if state['images']:
        return {'current_modality': 'image'}
    elif state['audio_segments']:
        return {'current_modality': 'audio'}
    return {'current_modality': 'text'}

def vision_understanding(state: OmniModalState):
    """Process image input"""
    image = state['images'][-1]
    description = gpt4v.describe(image)
    return {
        'messages': [f"[Image]: {description}"],
        'images': []  # Clear processed image
    }

def audio_processing(state: OmniModalState):
    """Process audio input"""
    audio = state['audio_segments'][-1]
    transcription = whisper.transcribe(audio)
    return {
        'messages': [f"[Audio]: {transcription}"],
        'audio_segments': []
    }

def agent_reasoning(state: OmniModalState):
    """Main reasoning with all context"""
    context = "\\n".join(state['messages'])
    
    # ReAct loop with all modalities in context
    response = llm.predict(
        f"Context:\\n{context}\\n\\nWhat action should I take?"
    )
    
    return {'messages': [response]}

# Build graph
workflow = StateGraph(OmniModalState)
workflow.add_node("route", process_input)
workflow.add_node("vision", vision_understanding)
workflow.add_node("audio", audio_processing)
workflow.add_node("agent", agent_reasoning)

# Add edges
workflow.set_entry_point("route")
workflow.add_conditional_edges(
    "route",
    lambda s: s['current_modality'],
    {
        'image': 'vision',
        'audio': 'audio',
        'text': 'agent'
    }
)
workflow.add_edge('vision', 'agent')
workflow.add_edge('audio', 'agent')
workflow.add_edge('agent', END)

app = workflow.compile()`,
        validationSteps: [
          'Handles text/image/audio in single conversation',
          'Maintains context across modalities',
          'Correctly references previous visual/audio'
        ],
        estimatedHours: 10,
        category: 'integration'
      }
    ]
  },
  {
    id: '4.9',
    title: 'Production Optimization',
    category: 'production',
    videoResources: [
      {
        id: 'whisper-opt',
        title: 'Whisper Optimization',
        youtubeId: 'Qf5fhFk0wZg',
        duration: '15m',
        channel: 'AssemblyAI',
        type: 'implementation'
      },
      {
        id: 'tensorrt-vit',
        title: 'TensorRT for Vision',
        youtubeId: 'TRfIeZxuV7U',
        duration: '20m',
        channel: 'NVIDIA',
        type: 'tutorial'
      },
      {
        id: 'onnx-export',
        title: 'ONNX Export for Models',
        youtubeId: 'p3MXp3x7P1A',
        duration: '18m',
        channel: 'Microsoft',
        type: 'implementation'
      }
    ],
    implementationTasks: [
      {
        id: 'whisper-int8',
        title: 'Whisper INT8 Quantization',
        description: 'Quantize Whisper model to INT8 for 2x faster inference with minimal accuracy loss.',
        codeTemplate: `import torch
import whisper
from optimum.onnxruntime import ORTModelForSpeechSeq2Seq

# Export Whisper to ONNX
model = whisper.load_model("base")

# Quantize to INT8
quantized_model = ORTModelForSpeechSeq2Seq.from_pretrained(
    "openai/whisper-base",
    export=True,
    quantization_config={
        'is_static': False,
        'format': 'QInt8'
    }
)

# Benchmark
import time

audio = whisper.load_audio("test.wav")

# FP32 inference
start = time.time()
result_fp32 = model.transcribe(audio)
fp32_time = time.time() - start

# INT8 inference
start = time.time()
result_int8 = quantized_model.transcribe(audio)
int8_time = time.time() - start

print(f"Speedup: {fp32_time / int8_time:.2f}x")
print(f"WER difference: {calculate_wer(result_fp32['text'], result_int8['text'])}")`,
        validationSteps: [
          '2x+ speedup over FP32',
          'WER increase <2%',
          'Model size reduced by 50%'
        ],
        estimatedHours: 4,
        category: 'audio'
      },
      {
        id: 'clip-onnx',
        title: 'CLIP ONNX Export + TensorRT',
        description: 'Export CLIP to ONNX and optimize with TensorRT for production deployment.',
        codeTemplate: `import torch
import clip
import onnx
from onnxruntime_tools import optimizer

# Load CLIP
model, preprocess = clip.load("ViT-B/32")

# Export to ONNX
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model.visual,
    dummy_input,
    "clip_visual.onnx",
    input_names=["image"],
    output_names=["embedding"],
    dynamic_axes={
        "image": {0: "batch_size"},
        "embedding": {0: "batch_size"}
    }
)

# Optimize with TensorRT
import tensorrt as trt

logger = trt.Logger(trt.Logger.INFO)
builder = trt.Builder(logger)
network = builder.create_network(
    1 << int(trt.NetworkDefinitionCreationFlag.EXPLICIT_BATCH)
)
parser = trt.OnnxParser(network, logger)

with open("clip_visual.onnx", "rb") as f:
    parser.parse(f.read())

# Build engine with FP16
config = builder.create_builder_config()
config.set_flag(trt.BuilderFlag.FP16)
config.max_workspace_size = 1 << 30  # 1GB

engine = builder.build_engine(network, config)

# Serialize for deployment
with open("clip_visual.trt", "wb") as f:
    f.write(engine.serialize())`,
        validationSteps: [
          'Inference time <5ms per image',
          'Throughput >200 images/sec on T4',
          'Numerical accuracy within 1% of PyTorch'
        ],
        estimatedHours: 6,
        category: 'vision'
      },
      {
        id: 'batch-inference',
        title: 'Batch Inference Pipeline',
        description: 'Build efficient batch processing for multimodal inference with dynamic batching.',
        codeTemplate: `import asyncio
from concurrent.futures import ThreadPoolExecutor
import torch

class BatchInferenceServer:
    def __init__(self, max_batch_size=16, max_wait_ms=50):
        self.max_batch_size = max_batch_size
        self.max_wait_ms = max_wait_ms
        self.request_queue = asyncio.Queue()
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.model = self.load_model()
        
    async def process_request(self, request_id, input_data):
        """Queue request and wait for result"""
        future = asyncio.Future()
        await self.request_queue.put({
            'id': request_id,
            'data': input_data,
            'future': future
        })
        return await future
    
    async def batch_processor(self):
        """Continuous batching loop"""
        while True:
            batch = []
            start_time = asyncio.get_event_loop().time()
            
            # Collect requests until batch full or timeout
            while len(batch) < self.max_batch_size:
                elapsed = (asyncio.get_event_loop().time() - start_time) * 1000
                timeout = max(0, (self.max_wait_ms - elapsed) / 1000)
                
                try:
                    request = await asyncio.wait_for(
                        self.request_queue.get(), 
                        timeout=timeout
                    )
                    batch.append(request)
                except asyncio.TimeoutError:
                    break
            
            if batch:
                # Process batch
                results = await self.inference_batch(batch)
                
                # Fulfill futures
                for request, result in zip(batch, results):
                    request['future'].set_result(result)
    
    async def inference_batch(self, batch):
        """Run model inference on batch"""
        inputs = torch.stack([b['data'] for b in batch])
        
        loop = asyncio.get_event_loop()
        results = await loop.run_in_executor(
            self.executor,
            lambda: self.model(inputs).cpu().numpy()
        )
        
        return results`,
        validationSteps: [
          'Throughput 3x higher than single inference',
          'P99 latency <100ms',
          'GPU utilization >80%'
        ],
        estimatedHours: 6,
        category: 'integration'
      }
    ]
  }
];

export const getSubModuleById = (id: string): MultimodalSubModule | undefined => {
  return multimodalSubModules.find(m => m.id === id);
};

export const getAllVideos = () => {
  return multimodalSubModules.flatMap(m => m.videoResources);
};

export const getVideosByCategory = (category: string) => {
  return multimodalSubModules
    .filter(m => m.category === category)
    .flatMap(m => m.videoResources);
};
