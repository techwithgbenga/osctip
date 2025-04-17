# app/connectors/base.py

from abc import ABC, abstractmethod

class BaseConnector(ABC):
    """
    Abstract base class for all threat intelligence connectors.
    """

    @abstractmethod
    async def fetch_data(self, *args, **kwargs):
        """
        Fetch raw threat intelligence data from upstream.
        Should return a dict or list of dicts.
        """
        raise NotImplementedError("fetch_data must be implemented by subclasses")
