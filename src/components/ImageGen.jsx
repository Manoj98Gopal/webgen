"use client"

import React, { useState } from 'react'

const ImageGen = () => {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('square_1_1')
  const [mode, setMode] = useState('classic')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [error, setError] = useState('')
  const [apiResponse, setApiResponse] = useState(null)

  // Updated size options with more descriptive labels and dimensions
  const sizeOptions = [
    { value: 'square_1_1', label: 'Square (1:1) - 1024x1024', dimensions: '1024x1024' },
    { value: 'classic_4_3', label: 'Classic (4:3) - 1024x768', dimensions: '1024x768' },
    { value: 'traditional_3_4', label: 'Traditional (3:4) - 768x1024', dimensions: '768x1024' },
    { value: 'widescreen_16_9', label: 'Widescreen (16:9) - 1024x576', dimensions: '1024x576' },
    { value: 'social_story_9_16', label: 'Social Story (9:16) - 576x1024', dimensions: '576x1024' },
    { value: 'smartphone_horizontal_20_9', label: 'Smartphone Horizontal (20:9) - 1024x461', dimensions: '1024x461' },
    { value: 'smartphone_vertical_9_20', label: 'Smartphone Vertical (9:20) - 461x1024', dimensions: '461x1024' },
    { value: 'standard_3_2', label: 'Standard (3:2) - 1024x683', dimensions: '1024x683' },
    { value: 'portrait_2_3', label: 'Portrait (2:3) - 683x1024', dimensions: '683x1024' },
    { value: 'horizontal_2_1', label: 'Horizontal (2:1) - 1024x512', dimensions: '1024x512' },
    { value: 'vertical_1_2', label: 'Vertical (1:2) - 512x1024', dimensions: '512x1024' },
    { value: 'social_5_4', label: 'Social (5:4) - 1024x819', dimensions: '1024x819' },
    { value: 'social_post_4_5', label: 'Social Post (4:5) - 819x1024', dimensions: '819x1024' },
  ]

  const modeOptions = [
    { 
      value: 'classic', 
      label: 'Classic Fast',
      description: 'Fast generation with good quality - Direct response',
      estimatedTime: '~5-10 seconds'
    },
    { 
      value: 'mystic', 
      label: 'Mystic',
      description: 'Higher quality, more artistic results',
      estimatedTime: '~30-60 seconds'
    },
    { 
      value: 'flux', 
      label: 'Flux Dev',
      description: 'Advanced AI model with excellent detail',
      estimatedTime: '~60-120 seconds'
    },
    { 
      value: 'imagen3', 
      label: 'Google Imagen 3',
      description: 'Google\'s latest image generation model',
      estimatedTime: '~45-90 seconds'
    }
  ]

  // Get the currently selected size info
  const getCurrentSizeInfo = () => {
    return sizeOptions.find(option => option.value === size) || sizeOptions[0];
  }

  const getCurrentModeInfo = () => {
    return modeOptions.find(option => option.value === mode) || modeOptions[0];
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedImage(null)
    setApiResponse(null)

    console.log('=== FRONTEND REQUEST ===');
    console.log('Prompt:', prompt);
    console.log('Size:', size);
    console.log('Mode:', mode);
    console.log('Expected dimensions:', getCurrentSizeInfo().dimensions);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim(), size, mode }),
      })

      const data = await response.json()
      console.log('=== API RESPONSE ===', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        setApiResponse(data)

        // Show warnings if size/dimensions don't match
        if (data.warning) {
          setError(`⚠️ ${data.warning}`)
        } else if (!data.dimensionsMatch && data.actualDimensions) {
          setError(`⚠️ Dimension mismatch: Expected ${getCurrentSizeInfo().dimensions} but got ${data.actualDimensions.width}x${data.actualDimensions.height}`)
        }
      } else {
        throw new Error('No image URL received from API')
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      
      // Handle both base64 and URL formats
      if (generatedImage.startsWith('data:')) {
        // Base64 image
        link.href = generatedImage
        link.download = `generated-image-${mode}-${size}-${Date.now()}.png`
      } else {
        // URL image - need to fetch and convert
        fetch(generatedImage)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob)
            link.href = url
            link.download = `generated-image-${mode}-${size}-${Date.now()}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          })
          .catch(err => {
            console.error('Download error:', err)
            setError('Failed to download image')
          })
        return
      }
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleClear = () => {
    setGeneratedImage(null)
    setApiResponse(null)
    setError('')
  }

  const getSizePreview = () => {
    const sizeInfo = getCurrentSizeInfo();
    const [width, height] = sizeInfo.dimensions.split('x').map(Number);
    const aspectRatio = width / height;
    
    // Calculate display size (max 60px)
    let displayWidth, displayHeight;
    if (aspectRatio > 1) {
      displayWidth = 60;
      displayHeight = 60 / aspectRatio;
    } else {
      displayHeight = 60;
      displayWidth = 60 * aspectRatio;
    }

    return (
      <div 
        className="border-2 border-gray-300 border-dashed bg-gray-50 flex items-center justify-center text-xs text-gray-500 ml-2"
        style={{ width: displayWidth, height: displayHeight, minWidth: 30, minHeight: 30 }}
      >
        {width}×{height}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Freepik AI Image Generator</h1>
        <p className="text-gray-600">Create stunning images from text descriptions using Freepik's advanced AI models</p>
      </div>

      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Image Prompt <span className="text-red-500">*</span>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate in detail..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Be specific and detailed for better results. Example: "A photorealistic portrait of a golden retriever sitting in a sunlit garden"
          </p>
        </div>

        {/* Mode Selection */}
        <div>
          <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">
            AI Model
          </label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {modeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500 mt-1 space-y-1">
            <p>{getCurrentModeInfo().description}</p>
            <p><strong>Estimated time:</strong> {getCurrentModeInfo().estimatedTime}</p>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Image Size & Aspect Ratio
          </label>
          <div className="flex items-center">
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {getSizePreview()}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Selected: <strong>{getCurrentSizeInfo().dimensions}</strong> pixels
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Image... ({getCurrentModeInfo().estimatedTime})
            </>
          ) : (
            <>
              Generate Image with {getCurrentModeInfo().label}
            </>
          )}
        </button>

        {/* Error/Warning Message */}
        {error && (
          <div className={`border rounded-md p-4 ${error.startsWith('⚠️') ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {error.startsWith('⚠️') ? (
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${error.startsWith('⚠️') ? 'text-yellow-800' : 'text-red-800'}`}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* API Response Debug Info */}
        {apiResponse && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Generation Details:</h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="space-y-2">
                <div><strong>Mode:</strong> {apiResponse.mode || 'N/A'}</div>
                <div><strong>Requested Size:</strong> {apiResponse.requestedSize}</div>
                <div><strong>Actual Size:</strong> {apiResponse.actualSize || 'N/A'}</div>
                <div><strong>Size Matches:</strong> {apiResponse.sizeMatches ? '✅ Yes' : '❌ No'}</div>
              </div>
              <div className="space-y-2">
                <div><strong>Requested Dimensions:</strong> {apiResponse.requestedDimensions ? `${apiResponse.requestedDimensions.width}×${apiResponse.requestedDimensions.height}` : 'N/A'}</div>
                <div><strong>Actual Dimensions:</strong> {apiResponse.actualDimensions ? `${apiResponse.actualDimensions.width}×${apiResponse.actualDimensions.height}` : 'N/A'}</div>
                <div><strong>Dimensions Match:</strong> {apiResponse.dimensionsMatch ? '✅ Yes' : '❌ No'}</div>
                {apiResponse.jobId && <div><strong>Job ID:</strong> {apiResponse.jobId}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800">Generated Image</h3>
                <div className="text-sm text-gray-500">
                  {apiResponse?.actualDimensions && 
                    `${apiResponse.actualDimensions.width}×${apiResponse.actualDimensions.height}`
                  }
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={generatedImage}
                  alt="Generated image"
                  className="max-w-full h-auto rounded-lg shadow-md border border-gray-300"
                  style={{ maxHeight: '600px' }}
                  onLoad={(e) => {
                    console.log('Image loaded:', {
                      naturalWidth: e.target.naturalWidth,
                      naturalHeight: e.target.naturalHeight
                    });
                  }}
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Image
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedImage).then(() => {
                    setError('✅ Image URL copied to clipboard');
                    setTimeout(() => setError(''), 3000);
                  }).catch(() => {
                    setError('Failed to copy URL to clipboard');
                  });
                }}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy URL
              </button>

              <button
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>

            {/* Generation Stats */}
            {apiResponse && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Generation Summary</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>✨ Successfully generated using <strong>{apiResponse.mode}</strong> model</div>
                  <div>📐 Size: <strong>{apiResponse.actualSize || 'Unknown'}</strong> ({apiResponse.actualDimensions ? `${apiResponse.actualDimensions.width}×${apiResponse.actualDimensions.height}` : 'Unknown dimensions'})</div>
                  {apiResponse.jobId && <div>🆔 Job ID: <code className="bg-blue-100 px-1 rounded">{apiResponse.jobId}</code></div>}
                  <div>
                    {apiResponse.sizeMatches && apiResponse.dimensionsMatch ? (
                      '✅ Perfect match - Got exactly what you requested!'
                    ) : (
                      '⚠️ Size/dimension mismatch detected - see details above'
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">💡 Tips for Better Results</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Be specific and descriptive in your prompts</li>
            <li>• Include style keywords like "photorealistic", "oil painting", "digital art"</li>
            <li>• Mention lighting: "soft lighting", "dramatic shadows", "golden hour"</li>
            <li>• Specify composition: "close-up", "wide shot", "bird's eye view"</li>
            <li>• Classic Fast is fastest but lower quality, Mystic and Flux provide better results</li>
            <li>• Different models may handle size requests differently - check the generation details</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageGen
