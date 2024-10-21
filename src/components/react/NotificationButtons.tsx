import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Tooltip,
} from '@material-tailwind/react';
import { MdOutlineWarning } from 'react-icons/md';

import {
  subscribeToArbitrage,
  unsubscribeToArbitrage,
} from '../../scripts/push-notifications/subscription.ts';
import ProfitSlider from './ProfitSlider.tsx';
import { MdiBellPlus } from './icons/MdiBellPlus.tsx';
import { MdiBellMinus } from './icons/MdiBellMinus.tsx';
import type { ICryptoPair } from '../../types.ts';

type NotificationButtonsProps = {
  symbol: ICryptoPair;
};

export default function NotificationButtons({
  symbol,
}: NotificationButtonsProps) {
  const [open, setOpen] = useState(false);
  const [openDeniedPermissionDialog, setOpenDeniedPermissionDialog] =
    useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [minProfit, setMinProfit] = useState<number | undefined>(0.8);
  const [volume, setVolume] = useState<string | undefined>('1.0');

  useEffect(() => {
    setSubscribed(localStorage.getItem('pushSubscription') !== null);
  }, []);

  const notify = (message: string, isError: boolean = false) =>
    !isError ? toast.success(message) : toast.error(message);

  const handleRemoveNotifications = () => {
    unsubscribeToArbitrage()
      .then(() => {
        setSubscribed(false);
        notify('Successfully unsubscribed.');
      })
      .catch(() => notify('Ha ocurrido un error.', true));
  };

  const handleOpen = () => setOpen(!open);

  const handleSubscribe = () => {
    if (!validate()) {
      return;
    }
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setOpen(false);

        subscribeToArbitrage(
          Number(minProfit),
          Number(volume),
          symbol.crypto,
          symbol.fiat
        )
          .then(() => {
            setSubscribed(true);
            notify('Success.');
          })
          .catch(() => notify(String('Ha ocurrido un error.'), true));

        console.log(`${minProfit} ${volume} ${symbol.crypto} ${symbol.fiat}`);
      } else {
        console.log('Notification.permission: ', Notification.permission);
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
            setOpenDeniedPermissionDialog(true);
          }
        });
      }
    }
  };

  const handleAddNotification = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      setOpenDeniedPermissionDialog(true);
    } else {
      setOpen(true);
    }
  };

  const handleMinProfitChange = (value: number) => {
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
        <Tooltip
          content='Nueva notificación'
          placement='top-start'
          className='bg-surfaceOffset'
        >
          <button
            className='group relative flex text-base'
            onClick={handleAddNotification}
          >
            <MdiBellPlus className={'text-default hover:text-lime-200'} />
          </button>
        </Tooltip>

        {subscribed && (
          <Tooltip
            content='Eliminar notificaciones'
            placement='top-start'
            className='bg-surfaceOffset'
          >
            <button
              className='group relative flex text-base'
              onClick={handleRemoveNotifications}
            >
              <MdiBellMinus />
            </button>
          </Tooltip>
        )}
      </div>

      <Dialog
        size='xs'
        open={openDeniedPermissionDialog}
        handler={() =>
          setOpenDeniedPermissionDialog(!openDeniedPermissionDialog)
        }
        className='bg-transparent'
      >
        <Card className='bg-surfaceOffset'>
          <CardBody className='flex flex-col items-center gap-2'>
            <MdOutlineWarning size={32} className='text-yellow-500' />
            <Typography variant='small' className='text-default'>
              Tienes que conceder permisos para poder recibir notificaciones.
            </Typography>
          </CardBody>
        </Card>
      </Dialog>

      <Dialog
        size='xs'
        open={open}
        handler={handleOpen}
        className='bg-transparent'
      >
        <Card className='bg-surfaceOffset'>
          <CardBody className='flex flex-col gap-2'>
            <Typography
              variant='paragraph'
              className='mb-1 font-semibold text-primary'
            >
              Nueva notificación
            </Typography>

            <Typography className='flex flex-row items-baseline gap-1'>
              <Typography
                variant='small'
                className='font-semibold text-default'
              >
                Symbol:
              </Typography>
              <Typography variant='small' className='text-xs text-default'>
                {symbol.crypto}/{symbol.fiat}
              </Typography>
            </Typography>

            <div className='flex flex-col gap-2'>
              <Typography
                variant='small'
                className='font-semibold text-default'
              >
                Min Profit
              </Typography>
              <ProfitSlider
                defaultValue={0.8}
                onChange={handleMinProfitChange}
              />
            </div>

            <Typography variant='small' className='font-semibold text-default'>
              Volumen
            </Typography>
            <Input
              type='number'
              className='text-default'
              value={volume}
              onChange={handleVolume}
              error={Number(volume) < 0}
            />
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
