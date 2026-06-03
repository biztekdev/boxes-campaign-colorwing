import { useState, useEffect, useCallback, useRef } from 'react'

const API_BASE_URL = 'https://colorwing-session-dashboard.vercel.app'

// Module-level tracking to prevent duplicate calls across StrictMode remounts
const pendingSessions = new Set()

/**
 * Custom hook for tracking form sessions with the ColorWing Session Dashboard
 * @param {Object} options - Configuration options
 * @param {string} options.formId - Unique identifier for the form (e.g., "contact-form", "newsletter-signup")
 * @param {string} [options.userId] - Optional user ID if user is authenticated
 * @param {number} [options.debounceMs=1000] - Debounce delay in milliseconds for field updates
 * @returns {Object} - { sessionId, isReady, updateSession, debouncedUpdate }
 */
export function useSessionTracking({ formId, userId, debounceMs = 1000 }) {
  const [sessionId, setSessionId] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const isCreatingRef = useRef(false) // Prevent concurrent creation
  const abortControllerRef = useRef(null) // For cleanup

  // Create session on mount
  useEffect(() => {
    // Create unique key for this form instance
    const sessionKey = `${formId}-${userId || 'default'}`
    
    // If session already exists or is being created globally, don't create again
    if (sessionId || pendingSessions.has(sessionKey)) {
      return
    }
    
    // Mark as pending (module-level, persists across remounts)
    pendingSessions.add(sessionKey)
    isCreatingRef.current = true
    abortControllerRef.current = new AbortController()

    const createSession = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formId,
            ...(userId && { userId }),
          }),
          signal: abortControllerRef.current?.signal, // Allow cancellation
        })

        if (response.ok) {
          const data = await response.json()
          setSessionId(data.sessionId)
          setIsReady(true)
          // console.log('Session created:', data.sessionId)
          // Remove from pending after successful creation
          // This allows new session creation if component remounts later (e.g., user navigates back)
          setTimeout(() => {
            pendingSessions.delete(sessionKey)
          }, 100) // Small delay to prevent immediate remount from creating duplicate
        } else {
          console.error('Failed to create session:', response.status)
          setIsReady(true) // Continue even if session creation fails
          pendingSessions.delete(sessionKey) // Remove on failure so it can retry
        }
      } catch (error) {
        // Ignore abort errors
        if (error.name === 'AbortError') {
          // console.log('Session creation aborted')
          pendingSessions.delete(sessionKey)
          return
        }
        console.error('Error creating session:', error)
        setIsReady(true) // Continue even if session creation fails
        pendingSessions.delete(sessionKey) // Remove on failure
      } finally {
        isCreatingRef.current = false
      }
    }

    createSession()

    // Cleanup function to abort if component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      isCreatingRef.current = false
      // Note: We don't remove from pendingSessions here because
      // StrictMode will remount immediately and we want to prevent duplicate calls
    }
  }, [formId, userId]) // Removed sessionId from deps to prevent re-running

  // Update session data
  const updateSession = useCallback(
    async (data) => {
      if (!sessionId || !isReady) return

      try {
        const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          console.error('Failed to update session:', response.status)
        }
      } catch (error) {
        console.error('Error updating session:', error)
        // Don't throw - session tracking failures should not block form submission
      }
    },
    [sessionId, isReady]
  )

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timeout = null
      return (data) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          updateSession(data)
        }, debounceMs)
      }
    })(),
    [updateSession, debounceMs]
  )

  return {
    sessionId,
    isReady,
    updateSession,
    debouncedUpdate,
  }
}

