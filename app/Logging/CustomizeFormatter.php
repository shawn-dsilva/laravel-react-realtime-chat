<?php

namespace App\Logging;

use \Bramus\Monolog\Formatter\ColoredLineFormatter;
use \Bramus\Monolog\Formatter\ColorSchemes\TrafficLight;

class CustomizeFormatter
{
    /**
     * Customize the given logger instance.
     *
     * @param  \Illuminate\Log\Logger  $logger
     * @return void
     */
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(new ColoredLineFormatter(new TrafficLight()));
        }
    }
}