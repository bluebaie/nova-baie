'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { OPEN_CONSENT_EVENT, loadAnalytics, readConsent, withdrawAnalytics, writeConsent } from '@/lib/consent';

/**
 * Non-blocking consent panel. Accept, refuse and customise have the same weight.
 * Nothing non-essential runs until the visitor accepts audience measurement.
 */
export function ConsentManager() {
  const t = useTranslations('consent');
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const toggleId = useId();

  useEffect(() => {
    const choice = readConsent();
    if (choice?.analytics) loadAnalytics();
    if (!choice) setOpen(true);
    else setAnalytics(choice.analytics);
    const reopen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setAnalytics(readConsent()?.analytics ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (open && returnFocus.current) panel.current?.focus();
  }, [open]);

  const decide = (granted: boolean) => {
    const previous = readConsent();
    writeConsent(granted);
    setAnalytics(granted);
    setOpen(false);
    setDetails(false);
    returnFocus.current?.focus();
    if (granted) loadAnalytics();
    else if (previous?.analytics) withdrawAnalytics();
  };

  if (!open) return null;
  return <div ref={panel} tabIndex={-1} className="consent-panel" role="region" aria-labelledby={`${toggleId}-title`} data-consent-panel>
    <p className="consent-eyebrow">{t('eyebrow')}</p>
    <h2 id={`${toggleId}-title`} className="consent-title">{t('title')}</h2>
    <p className="consent-text">{t('text')} <Link href="/mentions-legales#cookies">{t('policy')}</Link></p>
    {details && <div className="consent-details">
      <div className="consent-row">
        <div><p className="consent-row-title">{t('essentialTitle')}</p><p>{t('essentialText')}</p></div>
        <span className="consent-always">{t('always')}</span>
      </div>
      <div className="consent-row">
        <div><label htmlFor={toggleId} className="consent-row-title">{t('analyticsTitle')}</label><p>{t('analyticsText')}</p></div>
        <input id={toggleId} type="checkbox" role="switch" className="consent-switch" checked={analytics} onChange={event => setAnalytics(event.target.checked)} />
      </div>
    </div>}
    <div className="consent-actions">
      <button type="button" onClick={() => decide(false)} data-consent="refuse">{t('refuse')}</button>
      {details
        ? <button type="button" onClick={() => decide(analytics)} data-consent="save">{t('save')}</button>
        : <button type="button" onClick={() => setDetails(true)} aria-expanded={false} data-consent="customise">{t('customise')}</button>}
      <button type="button" onClick={() => decide(true)} data-consent="accept">{t('accept')}</button>
    </div>
  </div>;
}

/** Footer control to reopen the consent panel at any time. */
export function ConsentSettingsButton({ label }: { label: string }) {
  return <button type="button" className="footer-consent" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>{label}</button>;
}
