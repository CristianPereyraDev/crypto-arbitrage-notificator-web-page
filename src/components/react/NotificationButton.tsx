import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';

import {
  subscribeToArbitrage,
  unsubscribeToArbitrage,
} from '../../scripts/push-notifications/subscription.ts';
import { MdiBellRing } from './icons/MdiBellRing.tsx';
import ProfitSlider from './ProfitSlider.tsx';
import { MdiBellPlus } from './icons/MdiBellPlus.tsx';
import { MdiBellMinus } from './icons/MdiBellMinus.tsx';

export default function NotificationButton() {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [minProfit, setMinProfit] = useState<string | undefined>('0.8');
  const [volume, setVolume] = useState<string | undefined>('1.0');
  const [crypto, setCrypto] = useState<string | undefined>('USDT');
  const [fiat, setFiat] = useState<string | undefined>('ARS');

  useEffect(() => {
    setSubscribed(localStorage.getItem('pushSubscription') !== null);
  }, []);

  const notify = (message: string, isError: boolean = false) =>
    !isError ? toast.success(message) : toast.error(message);

  const showNotification = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        if (!subscribed) {
          setOpen(true);
        } else {
          unsubscribeToArbitrage()
            .then(() => {
              setSubscribed(false);
              notify('Successfully unsubscribed.');
            })
            .catch(() => notify('Ha ocurrido un error.', true));
        }
      } else {
        return new Promise(function (resolve, reject) {
          const permissionResult = Notification.requestPermission(function (
            result
          ) {
            resolve(result);
          });

          if (permissionResult) {
            permissionResult.then(resolve, reject);
          }
        }).then(function (permissionResult) {
          if (permissionResult !== 'granted') {
            throw new Error("We weren't granted permission.");
          }
        });
      }
    } else {
      alert('This browser does not support notifications.');
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleSubscribe = () => {
    if (validate()) {
      setOpen(false);

      subscribeToArbitrage(Number(minProfit), Number(volume), crypto, fiat)
        .then(() => {
          setSubscribed(true);
          notify('Success.');
        })
        .catch(() => notify(String('Ha ocurrido un error.'), true));

      console.log(`${minProfit} ${volume} ${crypto} ${fiat}`);
    }
  };

  const handleAddNotification = () => {
    setOpen(true);
  };

  const handleMinProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinProfit(value);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVolume(value);
  };

  const validate = () => {
    if (Number.isNaN(Number(minProfit)) && Number(minProfit) <= 0) {
      return false;
    }
    if (Number.isNaN(Number(volume)) && Number(volume) <= 0) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <div className='flex flex-row gap-2'>
        <button
          className='group flex relative text-base'
          onClick={showNotification}
        >
          {!subscribed ? (
            <MdiBellRing className={`text-default hover:text-lime-200`} />
          ) : (
            <MdiBellMinus />
          )}
          <span
            className='group-hover:opacity-100 transition-opacity bg-[--color-surface-offset] px-2 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-2 opacity-0 m-4 mx-auto top-0 whitespace-nowrap'
          >
            {subscribed ? 'Eliminar notificaciones' : 'Activar notificaciones'}
          </span>
        </button>

        {subscribed && (
          <button
            className='group flex relative text-base'
            onClick={handleAddNotification}
          >
            <MdiBellPlus className={'text-default hover:text-lime-200'} />
            <span
              className='group-hover:opacity-100 transition-opacity bg-[--color-surface-offset] px-2 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-2 opacity-0 m-4 mx-auto top-0 whitespace-nowrap'
            >
              Nueva notificación
            </span>
          </button>
        )}
      </div>

      <Dialog
        size='xs'
        open={open}
        handler={handleOpen}
        className='bg-transparent'
      >
        <Card className='bg-surfaceOffset'>
          <CardBody className='flex flex-col gap-2'>
            <Typography
              variant='lead'
              className='text-primary font-semibold mb-1'
            >
              Nueva notificación
            </Typography>

            <div className='flex flex-col gap-2'>
              <Typography
                variant='small'
                className='text-default font-semibold'
              >
                Min Profit
              </Typography>
              <ProfitSlider
                defaultValue={0.8}
                min={0.2}
                max={10}
                step={0.1}
                onChange={handleMinProfit}
              />
            </div>

            <Typography variant='small' className='text-default font-semibold'>
              Volumen
            </Typography>
            <Input
              type='number'
              className='text-default'
              value={volume}
              onChange={handleVolume}
              error={Number(volume) < 0}
            />

            <Typography variant='small' className='text-default font-semibold'>
              Crypto
            </Typography>
            <Select
              size='md'
              className='text-default'
              value={crypto}
              onChange={(val) => setCrypto(val)}
            >
              <Option value='USDT'>USDT</Option>
              <Option value='BTC'>BTC</Option>
            </Select>

            <Typography variant='small' className='text-default font-semibold'>
              Fiat
            </Typography>
            <Select
              className='text-default'
              value={fiat}
              onChange={(val) => setFiat(val)}
            >
              <Option value='ARS'>ARS</Option>
            </Select>
          </CardBody>

          <CardFooter className='flex flex-row justify-center'>
            <Button
              className='text-primary'
              size='sm'
              onClick={handleSubscribe}
            >
              agregar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Toaster />
    </div>
  );
}
